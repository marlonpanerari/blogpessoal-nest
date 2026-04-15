import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

/* Entity = Modela os dados (tabela no banco)
✔ Representa a estrutura da tabela
✔ Usado pelo TypeORM */

@Entity({ name: 'tb_postagem' }) //Cria uma tabela chamada tb_postagem
export class Postagem {

  @ApiProperty()
  @PrimaryGeneratedColumn() //Cria uma chave primária e auto increment
  id!: number;

  @ApiProperty()
  @IsNotEmpty() //Verifica se o campo está vazio
  @Column({ length: 100, nullable: false })//Cria uma coluna chamada titulo
  titulo!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto!: string;

  @ApiProperty()
  @UpdateDateColumn() //Cria uma coluna chamada data atualização da postagem
  data!: Date;

  @ApiProperty()
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: "CASCADE"
  })
  tema!: Tema;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: "CASCADE"
  })
  usuario!: Usuario;
}