import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";

export class CreateBooksDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'title' })
    title: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'new author' })
    author: string;
    @IsOptional()
    user?: User[] | Array<number>;
}