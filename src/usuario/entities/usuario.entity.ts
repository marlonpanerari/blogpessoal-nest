import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id!: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome!: string

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty({ example: "email@email.com.br" })
    usuario!: string

    @MinLength(8, { message: "A senha deve ter 8 digitos" }) //A senha tem q ter min 8  digitos
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    senha!: string

    @Column({ length: 5000 })
    @ApiProperty()
    foto!: string

    @ApiProperty({ type: () => Postagem, isArray: true })
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem!: Postagem[]

}