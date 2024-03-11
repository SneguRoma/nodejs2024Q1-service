import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userResponse } from './helpers/userRequest';

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
        .json(userResponse(this.usersService.create(createUserDto)));
    } catch (error) {
      console.error('Error in create:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll().map((user) => userResponse(user));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (id.length !== 36) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid userId format' });
    } else {
      const findedUser = this.usersService.findOne(id);
      if (findedUser)
        return res
          .status(HttpStatus.OK)
          .json(userResponse(this.usersService.findOne(id)));
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'user does not exist' });
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      if (id.length !== 36) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid userId format' });
      }
      const { oldPassword, newPassword } = updateUserDto;
      if (!oldPassword || !newPassword) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'Invalid DTO format' });
      }
      const findedUser = this.usersService.findOne(id);
      if (findedUser) {
        if (findedUser.password === oldPassword) {
          return res
            .status(HttpStatus.OK)
            .json(userResponse(this.usersService.update(id, newPassword)));
        } else {
          return res
            .status(HttpStatus.FORBIDDEN)
            .json({ error: 'incorrect password' });
        }
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'user does not exist' });
    } catch (error) {
      console.error('Error in create:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (id.length !== 36) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Invalid userId format' });
    } else {
      const findedUser = this.usersService.findOne(id);

      if (findedUser) {
        return res
          .status(HttpStatus.NO_CONTENT)
          .send(this.usersService.remove(id));
      }
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'user does not exist' });
    }
  }
}
