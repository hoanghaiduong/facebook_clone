import { Post } from "src/post/entities/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    caption: string;

    @Column({ nullable: true, type: 'longtext' })
    description: string;

    @ManyToOne(() => Post, post => post.images, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    image: Post;

}
