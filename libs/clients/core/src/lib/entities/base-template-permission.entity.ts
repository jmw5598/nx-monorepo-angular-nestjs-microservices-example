import { Permission } from './permission.entity';

export interface BaseTemplatePermission {
  id: string,
  canCreate: boolean,
  canRead: boolean,
  canUpdate: boolean,
  canDelete: boolean,
  permissionId: string,
  permission?: Permission,
}
