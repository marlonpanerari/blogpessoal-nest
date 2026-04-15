import { AuthModule } from './auth/auth.module';
import { TemaModule } from './tema/tema.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.modules';
import { UsuarioModule } from './usuario/usuario.module';
import { Tema } from './tema/entities/tema.entity';
import { Usuario } from './usuario/entities/usuario.entity';
import { ProdService } from './data/prod.service';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './data/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }