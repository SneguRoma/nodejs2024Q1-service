import { Injectable } from '@nestjs/common';
import { IUserStorage } from '../interfaces/users-storage.interface';
import { IUser } from '../interfaces/user.interface';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersStorage implements IUserStorage {
  users: IUser[] = [];

  get(): IUser[] {
    return this.users;
  }

  getUser(id: string): IUser {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUse: CreateUserDto): IUser {
    const { login, password } = createUse;
    const newUser = new User(login, password);

    this.users.push(newUser);
    return newUser;
  }
}
