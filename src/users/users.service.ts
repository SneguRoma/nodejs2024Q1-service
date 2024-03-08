import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { UsersStorage } from './store/users.storage';

@Injectable()
export class UsersService {
  constructor(private storage: UsersStorage) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.createUser(createUserDto);
  }

  findAll() {
    return this.storage.get();
  }

  findOne(id: string) {
    return this.storage.getUser(id);
  }

  update(id: string, newPass: string) {
    return this.storage.updateUser(newPass, id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
