import { Injectable } from '@nestjs/common';
import { IUserStorage } from '../interfaces/users-storage.interface';
import { IUser } from '../interfaces/user.interface';

import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
//import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersStorage implements IUserStorage {
  users: IUser[] = [
    {
      id: '4205d419-a068-4115-9462-c64e78ad247c',
      login: 'string',
      password: 'string',
      version: 1,
      createdAt: 1709914791,
      updatedAt: 1709914791,
    },
  ];

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

  updateUser(updatePass: string, id: string): IUser {
    const updatedUser = this.getUser(id);

    updatedUser.password = updatePass;
    return updatedUser;
  }
}
