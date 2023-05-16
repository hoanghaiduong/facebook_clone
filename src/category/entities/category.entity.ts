import { Post } from 'src/post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Post, post => post.category, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  posts: Post[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
