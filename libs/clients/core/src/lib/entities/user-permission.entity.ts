import { BaseTemplatePermission } from './base-template-permission.entity';

import { UserModulePermission } from './user-module-permission.entity';

export interface UserPermission extends BaseTemplatePermission {
  userModulePermissionId: string,
  userModulePermission?: UserModulePermission
}
