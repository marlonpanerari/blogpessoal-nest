import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../tema/entities/tema.entity"
import { Usuario } from "../../usuario/entities/usuario.entity"

@Entity({name: 'tb_postagem'})

export class Postagem{

    @PrimaryGeneratedColumn() // Cria chave primaria e auto increment
    id!: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    titulo!: string

    @IsNotEmpty()
    @Column({length: 10000, nullable: false})
    texto!: string

    @UpdateDateColumn()
    data!: Date

     @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema!: Tema

    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {onDelete: "CASCADE"})
    usuario!: Usuario
}