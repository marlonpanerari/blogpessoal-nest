import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
 
describe('Testes dos Módulos Usuário e Auth (e2e)', () => {  // descrição do teste e2e
  let token: string;
  let usuarioid: any;
  let app: INestApplication; // declara a variável app do tipo INestApplication
 
  beforeAll(async () => {  // configurações iniciais do teste que serão executadas antes de todos os testes uma vez so no inicio.
    const moduleFixture: TestingModule = await Test.createTestingModule({ // cria o modulo de teste nest e configura as dependências do modulo
      imports: [
        TypeOrmModule.forRoot({ // configuração do typeorm com o banco em memoria
          type: "sqlite",  // tipo de banco
          database: ":memory:", // banco em memoria, sera apagado ao final do teste
          entities: [__dirname + "./../src/**/entities/*.entity.ts"], // caminho dos arquivos de entidades
          synchronize: true, // sincroniza as entidades com o banco
          dropSchema: true // apaga o banco ao final do teste
        }),
        AppModule], // importa o modulo principal para que as dependências sejam resolvidas
    }).compile(); // compila o modulo
 
    app = moduleFixture.createNestApplication();  // cria a aplicação nest
    app.useGlobalPipes(new ValidationPipe()); // configuração de validação de dados de entrada
    await app.init(); // inicializa a aplicação nest e configuração da porta do servidor que é a porta 4000
  });
 
  // testes
  it("01 - Deve criar um novo usuário", async () => { // testa se o usuário pode ser criado
    const resposta = await request(app.getHttpServer())
    .post("/usuarios/cadastrar")
    .send({
      nome: "Admin",
      usuario: "admin@gmail.com",
      senha: "12345678",
      foto: "-"
    }).expect(201);
    usuarioid = resposta.body.id;
  })
 
  it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
      return await request(app.getHttpServer())
          .post('/usuarios/cadastrar')
          .send({
              nome: 'Admin',
              usuario: 'admin@gmail.com',
              senha: '12345678',
              foto: '-',
          })
          .expect(400)
  });

it("03 - Deve Autenticar o Usuário (Login)", async () => {
    const resposta = await request(app.getHttpServer())
        .post("/usuarios/logar")
        .send({
            usuario: 'admin@gmail.com',
            senha: '12345678',
        })
        .expect(200)

    token = resposta.body.token;

});

it("04 - Deve Listar todos os Usuários", async () => {
    return await request(app.getHttpServer())
        .get('/usuarios/all')
        .set('Authorization', `${token}`)
        .expect(200)
})

it("05 - Deve Atualizar um Usuário", async () => {
    return request(app.getHttpServer())
        .put('/usuarios/atualizar')
        .set('Authorization', `${token}`)
        .send({
            id: usuarioid,
            nome: 'Admin Atualizado',
            usuario: 'admin@gmail.com',
            senha: '123456789',
            foto: '-',
        })
        .expect(200)
        .then( resposta => {
            expect("Admin Atualizado").toEqual(resposta.body.nome);
        })

})

  afterAll(async () => { // configurações finais do teste que são executadas depois de todos os testes uma vez so no final
    await app.close(); // fecha a aplicação nest
  });
 
});