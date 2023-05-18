import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({
        type: 'longtext'
    })
    content: string;

    @Column({
        type: 'longtext',
        nullable: true
    })
    photo: string;
    @Column({
        type: 'json',
        nullable: true
    })
    images: any[];
    @Column({
        nullable: true,
        default: 0
    })
    favorites: number;
    @Column({
        nullable: true,
        default: 0
    })
    views: number;

    @Column({
        nullable: true,
        default: true
    })
    isFeatured: boolean;
    @Column({
        nullable: true,
        default: true
    })
    isTrending: boolean;
    @Column({
        nullable: true,
        default: true
    })
    isPopular: boolean;
    @Column({
        nullable: true,
        default: true
    })
    isHot: boolean;
    @Column({
        nullable: true,
        default: true
    })
    isNews: boolean;
    @Column({
        nullable: true,
        default: true
    })
    isFavourite: boolean;
    @ManyToOne(() => User, user => user.posts)
    user: User;

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];

    @ManyToOne(() => Category, category => category.posts, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: true })
    category: Category;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
