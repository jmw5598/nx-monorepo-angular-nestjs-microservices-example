import { 
  ModulePermission, 
  Permission, 
  TemplateModulePermission, 
  User, 
  UserModulePermission, 
  UserPermission,
  UserAccount } from '@vsp/clients/core';

export const mapAssignableModulePermissionsToUserModulePermissions = (modulePermissions: ModulePermission[]): UserModulePermission[] => {
  return modulePermissions
    .map(modulePermission => modulePermissionToUserModulePermission(modulePermission));
}

export const modulePermissionToUserModulePermission = (modulePermission: ModulePermission): UserModulePermission => {
  return {
    hasAccess: false,
    modulePermission: {
      ...modulePermission
    },
    userPermissions: [
      ...modulePermission?.permissions?.map(permission => permissionToUserPermission(permission)) || []
    ] as UserPermission[]
  } as UserModulePermission;
}

export const permissionToUserPermission = (permission: Permission): UserPermission => {
  return {
    permission: permission,
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false
  } as UserPermission
}


export const userAccountFormToUserAccount = (formValue: any): UserAccount => ({
  user: {
    ...formValue.user,
    profile: formValue.profile
  } as User,
  userModulePermissions: formValue.userModulePermissions.map((ump: UserModulePermission) => {
    return {
      ...ump,
      modulePermissionId: ump.modulePermission?.id,
      modulePermission: undefined,
      userPermissions: ump.userPermissions?.map((up: UserPermission) => {
        return {
          ...up,
          permissionId: up.permission?.id,
          permission: undefined
        } as UserPermission;
      })
    } as UserModulePermission
  })
} as UserAccount);

export const templateModulerPermissionsToUserModulerPermissions = 
  (templateModulePermissions: TemplateModulePermission[]): UserModulePermission[] => {
    return templateModulePermissions.map(templateModulePermission => ({
      hasAccess: templateModulePermission.hasAccess,
      modulePermissionId: templateModulePermission.modulePermissionId,
      modulePermission: {...templateModulePermission.modulePermission },
      userPermissions: templateModulePermission.templatePermissions?.map(templatePermission => ({
        canCreate: templatePermission.canCreate,
        canRead: templatePermission.canRead,
        canUpdate: templatePermission.canUpdate,
        canDelete: templatePermission.canDelete,
        permissionId: templatePermission.permissionId,
        permission: { ...templatePermission.permission },
      } as UserPermission)) || []
    } as UserModulePermission));
  }
