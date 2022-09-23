import { Injectable } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { Books } from 'src/books/entity/books.entity';
import { DeleteResult, In } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly booksService: BooksService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if(createUserDto.books) {
      const books = await this.getUserBooks(createUserDto);
      createUserDto.books = books;
    }
    return await this.userRepository.create(createUserDto);
  }
  async updateUser(newUpdateUser: User): Promise<User> {
    if(newUpdateUser.books) {
      const books = await this.getUserBooks(newUpdateUser);
      newUpdateUser.books = books;
    }
    return await this.userRepository.updateOne(newUpdateUser.id, newUpdateUser);
  }
  private async getUserBooks(user: User | CreateUserDto): Promise<Books[]> {
    const booksId = user.books.map((book) => (typeof book == 'object'? book.id : book));
    const books = await this.booksService.findAllBooks({
      where: { id: In(booksId) },
    });
    return books;
  }
  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.deleteOne(id)
  }
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAll()
  }
  async findUsers(query): Promise<User[]> {
    return await this.userRepository.find(query)
  }
  async getUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({id})
  }
}
