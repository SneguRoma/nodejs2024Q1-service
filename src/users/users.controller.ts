import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      if (!createUserDto.login || !createUserDto.password) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Login and password are required' });
      }

      return res
        .status(HttpStatus.CREATED)
        .json(this.usersService.create(createUserDto));
    } catch (error) {
      console.error('Error in create:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    //const isValidUUID = id.length === 6? true : false;
    //const uuidRegex = /^[a-fA-F0-9]{6}$/;

    if (id.length !== 36) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid userId format' });
    } else {
      const a = this.usersService.findOne(id);
      if (a) return res.status(HttpStatus.OK).json(a);
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'user does not exist' });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
