import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BooksModule } from './books/books.module';
import { DbModule } from './shared/db/db.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DbModule,
    UserModule,
    BooksModule
  ],
  controllers: [AppController],
})
export class AppModule {}
