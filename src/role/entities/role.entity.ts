import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @ManyToMany(() => User, user => user.roles, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    users: User[];

}
