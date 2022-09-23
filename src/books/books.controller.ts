import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/createBooksDto.dto';
import { Books } from './entity/books.entity';

@Controller('books')
@ApiTags('Books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get('get-all')
  async getAllBooks(): Promise<Books[]> {
    return await this.booksService.getAllBooks();
  }
  @Get('/:id')
  @ApiParam({ type: Number, name: 'id' })
  async getBook(@Param('id') id: number): Promise<Books> {
    return await this.booksService.getBook(id);
  }
  @Post('create')
  @ApiBody({ type: CreateBooksDto })
  async createBooks(@Body() createBooksDto: CreateBooksDto): Promise<Books> {
    return await this.booksService.createBooks(createBooksDto);
  }
  @Patch('update')
  @ApiBody({ type: Books })
  async updateBooks(@Body() updateBooksDto: Books): Promise<Books> {
    return await this.booksService.updateBooks(updateBooksDto);
  }
  @Delete('/:id')
  @ApiParam({ type: Number, name: 'id' })
  async deleteBook(@Param('id') id: number): Promise<DeleteResult> {
    return await this.booksService.deleteBook(id);
  }
}
