import { ModulePermission } from './module-permission.entity';

export interface Permission {
  id: string,
  name: string,
  modulePermissionId: string,
  modulePermission?: ModulePermission
}
