import { Injectable } from '@nestjs/common';
import { IUserStorage } from '../interfaces/users-storage.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UsersStorage implements IUserStorage {
  users: IUser[] = [
    {
      id: 'string', // uuid v4
      login: 'string',
      password: 'string',
      version: 1, // integer number, increments on update
      createdAt: 1, // timestamp of creation
      updatedAt: 1, // timestamp of last update
    },
  ];

  get(): IUser[] {
    return this.users;
  }
}
