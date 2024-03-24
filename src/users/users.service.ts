import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { userResponse } from './helpers/userRequest';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private storage: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.storage.save(new User(createUserDto));
    const responceUser = userResponse(newUser);
    return responceUser;
  }

  async findAll() {
    return (await this.storage.find()).map((user) => userResponse(user));
  }

  async findOne(id: string) {
    const user = await this.storage.findOneBy({ id });
    if (!user) {
      return '';
    }
    return user;
  }

  async update(updatedUser: User, newPass: string) {
    updatedUser.version += 1;
    updatedUser.password = newPass;
    const newUser = await this.storage.save(updatedUser);
    return userResponse(newUser);
  }

  async remove(id: string) {
    return await this.storage.delete(id);
  }
}
