import { Permission } from './permission.entity';

export interface ModulePermission {
  id: string,
  name: string,
  permissions?: Permission[] 
}
