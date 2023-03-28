import { createFeature, createReducer, on } from '@ngrx/store';

import { 
  UserModulePermission,
  UserPermission,
  UserModulePermissionsMap, 
  UserModulesAndPermissionsMap, 
  UserModulePermissions, 
  UserSettings, 
  ModulePermissionNames, 
  UserPermissionsMap, 
  PermissionNames } from '@vsp/clients/core';

import { UserActions } from './user.actions';

export interface UserState {
  userSettings: UserSettings | null,
  userModulesPermissions: UserModulePermissions | null,
  userModulePermissionsMap: UserModulesAndPermissionsMap | null
}

export const initialUserState: UserState = {
  userSettings: null,
  userModulesPermissions: null,
  userModulePermissionsMap: null
}

const handleGetUserSettingsSuccess = (state: UserState, { settings }: any) => ({
  ...state,
  userSettings: settings
} as UserState);

const handleGetUserPermissionsSuccess = (state: UserState, { userModulePermissions }: any) => ({
  ...state,
  userModulesPermissions: userModulePermissions,
  userModulePermissionsMap: mapUserModulesAndPermissionsMap(userModulePermissions?.modules)
} as UserState);

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialUserState,
    on(UserActions.getUserSettingsRequestSuccess, handleGetUserSettingsSuccess),
    on(UserActions.getUserPermissionsRequestSuccess, handleGetUserPermissionsSuccess)
  )
});


// -----------------
// Utility Functions
// -----------------
const mapUserModulesAndPermissionsMap = (userModulePermissions: UserModulePermission[]): UserModulesAndPermissionsMap => ({
    modules: createUserModulePermissionsMap(userModulePermissions),
    permissions: createUserPermissionsMap(userModulePermissions)
  } as UserModulesAndPermissionsMap);

const createUserModulePermissionsMap = 
  (userModulePermissions: UserModulePermission[]): UserModulePermissionsMap => userModulePermissions.reduce((map: UserModulePermissionsMap, module: UserModulePermission) => {
    const moduleName: ModulePermissionNames = module?.modulePermission?.name as ModulePermissionNames;
    const userModulePermission: UserModulePermission = { ...module, userPermissions: undefined } as UserModulePermission;
    
    if (moduleName && userModulePermission) {
      map[moduleName] = userModulePermission
    }
    
    return map;
  }, {} as UserModulePermissionsMap);

const createUserPermissionsMap = 
  (userModulePermissions: UserModulePermission[]): UserPermissionsMap => userModulePermissions.flatMap(modules => modules.userPermissions || [])
    .reduce((permissionsMap: UserPermissionsMap, permission: UserPermission) => {
      const permissionName: PermissionNames = permission?.permission?.name as PermissionNames;

      if (permissionName) {
        permissionsMap[permissionName] = permission
      }

      return permissionsMap
    }, {} as UserPermissionsMap);
