import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Configuração da aplicação nest, cria a aplicação

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact("Andressa Andrade", "https://github.com/Dessxevy", "andressa.evellyn.andrade@gmail.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'; // Configuração TimeZone

  app.useGlobalPipes(new ValidationPipe()); //ConfigurÇõ da validação de dados de entrada
  app.enableCors(); // Configuração de cors para permitir requisições de outras origens

  await app.listen(process.env.PORT ?? 4000); // Execução da aplicação nest, configuração da porta
}
bootstrap().catch((error) => {

  console.error('Erro ao iniciar aplicação:', error);
});

