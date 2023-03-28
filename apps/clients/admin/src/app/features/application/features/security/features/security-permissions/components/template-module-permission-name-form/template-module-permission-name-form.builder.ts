import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { TemplateModulePermission } from '@vsp/clients/core';

export const buildTemplateModulePermissionNameForm = (
  formBuilder: UntypedFormBuilder,
  templateModulePermissions: TemplateModulePermission[]
) => formBuilder.group({
  templateModulePermissionName: formBuilder.group({
    id: [null],
    name: ['', [
      Validators.required
    ]],
    description: ['', [
      Validators.required
    ]],
  }),
  templateModulePermissions: builderTemplateModulePermissionFormArray(formBuilder, templateModulePermissions)
});

export const builderTemplateModulePermissionFormArray = 
(formBuilder: UntypedFormBuilder, templateModulePermissions: TemplateModulePermission[]) : UntypedFormArray => formBuilder.array([
  ...templateModulePermissions?.map(m => formBuilder.group({
    id: [m.id],
    hasAccess: [m.hasAccess],
    canCreateAll: [false],
    canReadAll: [false],
    canUpdateAll: [false],
    canDeleteAll: [false],
    modulePermissionId: [m.modulePermissionId],
    modulePermission: formBuilder.group({
      id: [m?.modulePermission?.id],
      name: [m?.modulePermission?.name]
    }),
    templatePermissions: formBuilder.array([
      ...m?.templatePermissions?.map(permission => {
        return formBuilder.group({
          canCreate: [permission.canCreate],
          canRead: [permission.canRead],
          canUpdate: [permission.canUpdate],
          canDelete: [permission.canDelete],
          permission: formBuilder.group({
            id: [permission?.permission?.id],
            name: [permission?.permission?.name]
          })
        })
      }) || []
    ])
  })) || []
]);
