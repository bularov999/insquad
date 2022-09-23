import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('get-all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
  @Get('/:id')
  @ApiParam({ type: Number, name: 'id' })
  async getUser(@Param('id') id: number): Promise<User> {
    return await this.userService.getUser(id);
  }
  @Post('create')
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }
  @Patch('update')
  @ApiBody({ type: User })
  async updateUser(@Body() updateUserDto: User): Promise<User> {
    return await this.userService.updateUser(updateUserDto)
  }
  @Delete('/:id')
  @ApiParam({ type: Number, name: 'id' })
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.deleteUser(id)
  }
}
