import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { Books } from "./entity/books.entity";
import { BooksRepository } from "./repository/books.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Books]), forwardRef(() => UserModule)],
    controllers: [BooksController],
    providers: [BooksService, BooksRepository],
    exports: [BooksService]
})
export class BooksModule {}