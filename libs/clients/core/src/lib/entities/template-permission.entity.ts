import { BaseTemplatePermission } from './base-template-permission.entity';
import { TemplateModulePermission } from './template-module-permission.entity';

export interface TemplatePermission extends BaseTemplatePermission {
  templateModulePermissionId: string,
  tempalteModulePermission?: TemplateModulePermission
}
