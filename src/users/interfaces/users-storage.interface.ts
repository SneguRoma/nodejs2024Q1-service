import { IUser } from './user.interface';

export interface IUserStorage {
  get(): IUser[];
  users: IUser[];
}
