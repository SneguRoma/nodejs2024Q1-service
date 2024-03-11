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

  constructor(partial: Partial<User>) {
    this.id = uuidv4();
    Object.assign(this, partial);
    this.version = 1;
    this.createdAt = Date.now(); // timestamp of creation
    this.updatedAt = Date.now(); // timestamp of last update
  }
}
