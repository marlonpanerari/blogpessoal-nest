import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PostagemService } from './../services/postagem.service';
import { Postagem } from '../entities/postagem.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

/*Controller = Recebe as requisições e responde
✔ Recebe requisições HTTP (GET, POST, PUT, DELETE)
✔ Chama o service
✔ Retorna a resposta pro cliente*/

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard) //Exige token JWT
@Controller("/postagens")
@ApiBearerAuth()
export class PostagemController {
    constructor(private readonly PostagemService: PostagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]> {
        return this.PostagemService.findAll();
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.PostagemService.findAllByTitulo(titulo);
    }

    @Get('/:id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.PostagemService.findById(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.PostagemService.create(postagem);
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem> {
        return this.PostagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.PostagemService.delete(id);
    }
}

