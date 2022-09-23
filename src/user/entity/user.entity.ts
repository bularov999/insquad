import { BaseCustomEntity } from "src/base/base.entity";
import { Books } from "src/books/entity/books.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class User extends BaseCustomEntity{
    @Column()
    firstname: string;
    @Column()
    lastname: string;
    @Column()
    age: number;
    @Column()
    isFree: boolean;
    @ManyToMany(() => Books, (books) => books.user)
    @JoinTable()
    books: Books[]
}