import { Roles } from './roles.enum';

export interface Credentials {
  username: string,
  password: string
  rememberMe: boolean,
  requiredRoles: Roles[]
}
