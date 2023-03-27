import { BaseEntity } from './base.entity';
import { TemplateModulePermission } from './template-module-permission.entity';

export interface TemplateModulePermissionName extends BaseEntity {
  name: string,
  description: string,
  templateModulePermissions?: TemplateModulePermission[]
}
