import { BaseTemplateModulePermission } from './base-template-module-permission.entity';
import { UserPermission } from './user-permission.entity';
import { User } from './user.entity';

export interface UserModulePermission extends BaseTemplateModulePermission {
  userId: string,
  user?: User,
  userPermissions?: UserPermission[],
}
