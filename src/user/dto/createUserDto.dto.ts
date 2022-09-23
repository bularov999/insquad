import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Books } from "src/books/entity/books.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'my firstname' })
    firstname: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'my lastname' })
    lastname: string;
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 23 })
    age: number;
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ example: 'true' })
    isFree: boolean;
    @IsOptional()
    books?: Books[] | Array<number> ;
}