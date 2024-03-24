import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponse } from './helpers/userRequest';
import { validate } from 'uuid';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isValidUUID = validate(id);
    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const findedUser = await this.usersService.findOne(id);
      if (findedUser === '') {
        throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
      }
      return userResponse(findedUser);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isValidUUID = validate(id);

    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const { oldPassword, newPassword } = updateUserDto;

    const findedUser = await this.usersService.findOne(id);

    if (findedUser === '') {
      throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
    }

    if (findedUser) {
      if (findedUser.password === oldPassword) {
        const user = await this.usersService.update(findedUser, newPassword);
        return user;
      } else {
        throw new HttpException(`Wrong password`, HttpStatus.FORBIDDEN);
      }
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isValidUUID = validate(id);

    if (!isValidUUID) {
      throw new HttpException(
        `The provided ID (${id}) is not a valid UUID`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const findedUser = await this.usersService.findOne(id);

      if (findedUser === '') {
        throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
      }

      if (findedUser) {
        return this.usersService.remove(id);
      }
    }
  }
}
