import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // tipo da database
      host: 'localhost', // host da database (qual máquina)
      port: 3306, //porta da database
      username: 'root', //usuário da db
      password: 'root', //senha da db
      database: 'db_blogpessoal', //nome da database
      entities: [Postagem],
      synchronize: true,
    }),
      PostagemModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}