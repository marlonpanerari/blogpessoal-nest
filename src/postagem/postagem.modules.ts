import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";
import { TemaModule } from "../tema/tema.module";
 
@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule], //Importa o Postagem 
    providers: [PostagemService], //define o PostagemService como um provedor
    controllers: [PostagemController],
    exports: [TypeOrmModule] //exporta p typeOrmModule
})
export class PostagemModule {}