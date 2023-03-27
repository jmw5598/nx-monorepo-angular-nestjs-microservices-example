import { UserModulePermission, UserPermission } from '../../entities';

export enum ModulePermissionNames {
  ADMINISTRATION_MODULE = 'Administration Module',
  DASHBOARD_MODULE = 'Dashboard Module',
  INVENTORY_MODULE = 'Inventroy Module',
  SECURITY_MODULE = 'Security Module',
  SERVICE_MODULE = 'Service Module',
  CASES_MODULE = 'Cases Module',
  OFFENDERS_MODULE = 'Offenders Module',
  MISSING_MODULE = 'Missing Module',
}

export enum PermissionNames {
  DASHBOARD_OVERVIEW = 'Dashboard Overview',
  USER_ACCOUNTS = 'User Accounts',
  SECURITY_GENERAL = 'Security General',
  SECURITY_PERMISSIONS = 'Security Permissions',
  SETTINGS = 'Settings',
  MY_CASES = 'My Cases',
  CREATE_CASES = 'Create Cases',
  MANAGE_CASES = 'Manage Cases',
  CREATE_OFFENDERS = 'Create Offenders',
  MANAGE_OFFENDERS = 'Manage Offenders',
  CREATE_MISSING = 'Create Missing',
  MANAGE_MISSING = 'Manage Missing',
}

export type UserModulePermissionsMap = {
  [key in ModulePermissionNames]: UserModulePermission
}

export type UserPermissionsMap = {
  [key in PermissionNames]: UserPermission
}

export interface UserModulesAndPermissionsMap {
  modules: UserModulePermissionsMap,
  permissions: UserPermissionsMap
}

export interface UserModulePermissions {
  modules: UserModulePermission[]
}
