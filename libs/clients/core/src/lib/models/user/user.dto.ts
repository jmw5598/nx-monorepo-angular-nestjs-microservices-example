import { UserModulePermission, Profile } from '../../entities';
import { Roles } from '../authentication/roles.enum';

export interface UserAccountDto {
  id: string,
  userName: string,
  email: string,
  profile: Profile,
  roles?: Roles[]
  userModulePermissions?: UserModulePermission[]
}
