import { IUser } from './user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserStorage {
  get(): IUser[];
  getUser(id: string): IUser;
  createUser(createUser: CreateUserDto): IUser;
  updateUser(updatePass: string, id: string): IUser;
  deleteUser(id: string): void;
  users: IUser[];
}
