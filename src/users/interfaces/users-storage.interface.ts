import { IUser } from './user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserStorage {
  get(): IUser[];
  getUser(id: string): IUser;
  createUser(createUse: CreateUserDto): IUser;
  users: IUser[];
}
