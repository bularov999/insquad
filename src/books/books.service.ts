import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { DeleteResult, In } from 'typeorm';
import { CreateBooksDto } from './dto/createBooksDto.dto';
import { Books } from './entity/books.entity';
import { BooksRepository } from './repository/books.repository';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}
  async createBooks(createBooksDto: CreateBooksDto): Promise<Books> {
    if (createBooksDto.user) {
      createBooksDto.user = await this.getBookUsers(createBooksDto);
    }
    return this.booksRepository.create(createBooksDto);
  }
  async updateBooks(newUpdateBook: Books): Promise<Books> {
    if (newUpdateBook.user) {
      newUpdateBook.user = await this.getBookUsers(newUpdateBook);
    }
    return this.booksRepository.updateOne(newUpdateBook.id, newUpdateBook);
  }
  findAllBooks(query): Promise<Books[]> {
    return this.booksRepository.find(query);
  }
  async deleteBook(id: number): Promise<DeleteResult> {
    return await this.booksRepository.deleteOne(id)
  }
  async getAllBooks(): Promise<Books[]> {
    return await this.booksRepository.getAll()
  }
  async getBook(id: number): Promise<Books>{
    return await this.booksRepository.findOneBy({id})
  }
  private async getBookUsers(books: Books | CreateBooksDto): Promise<User[]> {
    const usersIds = books.user.map((user) =>
      typeof user == 'object' ? user.id : user,
    );
    const users = await this.userService.findUsers({
      where: { id: In(usersIds) },
    });
    return users;
  }
}
