//importações
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.modules';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //tipo da base de dados
      host: 'localhost', //host do database - está localcmente
      port: 3306, //porta de acesso do database
      username: 'root', //username do database
      password: 'root', //senha do database
      database: 'db_blogpessoal',  //nome do banco de dados
      entities: [Postagem, Tema], //entidades - tabelas construidas
      synchronize: true
    }),
    PostagemModule, TemaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
