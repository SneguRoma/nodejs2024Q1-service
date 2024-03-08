import { IUser } from './user.interface';

export interface IUserStorage {
  get(): IUser[];
  getUser(id: string): IUser;
  users: IUser[];
}
