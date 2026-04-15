import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact(
      'MarlonPanerari',
      'https://github.com/marlonpanerari',
      'marlonpanerari@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Aplicação rodando na porta ${port}`);
}

bootstrap().catch((error) => {
  console.error('❌ Erro ao iniciar aplicação:', error);
});