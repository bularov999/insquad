import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/base/base.repository";
import { Repository } from "typeorm";
import { Books } from "../entity/books.entity";

@Injectable()
export class BooksRepository extends BaseRepository<Books> {
    constructor(
        @InjectRepository(Books)
        private readonly usersRepository: Repository<Books>,
      ) {
        super(usersRepository);
      }
}