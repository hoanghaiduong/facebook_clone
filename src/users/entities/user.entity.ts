import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { Role } from 'src/role/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true
  })
  displayName: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;
  @Column({
    type: 'longtext',
    nullable: true
  })
  avatar: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true, default: false })
  disabled: boolean;

  @Column({
    nullable: true
  })
  sign_in_provider: string;

  @Column({ nullable: true, default: false })
  email_verified: boolean;

  @Column({ nullable: true })
  auth_time: number;

  @OneToMany(() => Post, post => post.user, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  posts: Post[];

  @OneToMany(() => Comment, comment => comment.user, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  comments: Comment[];

  @ManyToMany(() => Role, role => role.users, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({ name: 'user_role' }) // Sử dụng @JoinTable để tạo bảng nối
  roles: Role[];
  
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
