import { Exclude } from 'class-transformer';
import { IUser } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

export class User implements IUser {
  id: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  login: string;

  @Exclude()
  password: string;

  constructor(login: string, password: string) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Math.floor(Date.now() / 1000); // timestamp of creation
    this.updatedAt = Math.floor(Date.now() / 1000); // timestamp of last update
  }
}
