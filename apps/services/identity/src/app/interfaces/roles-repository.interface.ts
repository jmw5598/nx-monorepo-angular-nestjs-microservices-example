import { IRepository, Role } from '@vsp/services/common';

export const ROLES_REPOSITORY_TOKEN: string = 'ROLES_REPOSITORY_TOKEN';

export interface IRolesRepository extends IRepository<Role, string> { }
