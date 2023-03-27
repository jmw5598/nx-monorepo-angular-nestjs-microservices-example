import { User, UserModulePermission } from '../../entities';

export interface UserAccount {
  user: User,
  userModulePermissions: UserModulePermission[]
}
