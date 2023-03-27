import { ModulePermission } from './module-permission.entity';

export interface BaseTemplateModulePermission {
  id: string,
  hasAccess: boolean,
  modulePermissionId: string,
  modulePermission?: ModulePermission,
}
