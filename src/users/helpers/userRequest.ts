import { User } from '../entities/user.entity';

export const userResponse = (newUser: User) => {
  return {
    id: newUser.id,
    login: newUser.login,
    version: newUser.version,
    createdAt: new Date(newUser.createdAt).getTime(),
    updatedAt: new Date(newUser.updatedAt).getTime(),
  };
};
