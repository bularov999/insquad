import { BaseCustomEntity } from "src/base/base.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Books extends BaseCustomEntity{
    @Column()
    title: string;
    @Column()
    author: string;
    @ManyToMany(() => User, (user) => user.books)
    user: User[];
}