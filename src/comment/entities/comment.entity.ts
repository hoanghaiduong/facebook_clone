import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'longtext'
    })
    content: string;

    @ManyToOne(() => User, user => user.comments,{onDelete:'CASCADE', onUpdate:'CASCADE'})
    user: User;

    @ManyToOne(() => Post, post => post.comments,{onDelete:'CASCADE', onUpdate:'CASCADE'})
    post: Post;
}
