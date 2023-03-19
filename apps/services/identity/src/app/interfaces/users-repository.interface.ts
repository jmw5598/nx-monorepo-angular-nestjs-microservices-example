import { IRepository, User } from '@vsp/services/common';

export const USERS_REPOSITORY_TOKEN: string = 'USERS_REPOSITORY_TOKEN';

export interface IUsersRepository extends IRepository<User, string> { }
