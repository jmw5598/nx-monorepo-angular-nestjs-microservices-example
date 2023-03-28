import { ModulePermissionNames, PermissionNames } from '@vsp/clients/core';
import { AdminNavigationLink } from '@vsp/admin/core/models'

export const defaultNavigationMenu: AdminNavigationLink[] = [
  {
    label: 'Dashboard',
    routerLink: '/app/dashboard',
    icon: 'dashboard',
    requiredModulePermissionName: ModulePermissionNames.DASHBOARD_MODULE,
    children: [
      {
        label: 'Overview',
        requiredPermissionName: PermissionNames.DASHBOARD_OVERVIEW,
        routerLink: '/app/dashboard/overview',
        
      },
    ]
  },
  {
    label: 'Offenders',
    routerLink: '/app/offenders',
    icon: 'team',
    requiredModulePermissionName: ModulePermissionNames.OFFENDERS_MODULE,
    children: [
      {
        label: 'Create Offender',
        requiredPermissionName: PermissionNames.CREATE_OFFENDERS,
        routerLink: '/app/offenders/create',
      },
      {
        label: 'Manage Offenders',
        requiredPermissionName: PermissionNames.MANAGE_OFFENDERS,
        routerLink: '/app/offenders/manage',
      },
    ]
  },
  {
    label: 'Cases',
    routerLink: '/app/cases',
    icon: 'folder-view',
    requiredModulePermissionName: ModulePermissionNames.CASES_MODULE,
    children: [
      {
        label: 'Create Case',
        requiredPermissionName: PermissionNames.CREATE_CASES,
        routerLink: '/app/cases/create',
      },
      {
        label: 'My Cases',
        requiredPermissionName: PermissionNames.MY_CASES,
        routerLink: '/app/cases/mine',
      },
      {
        label: 'Manage Cases',
        requiredPermissionName: PermissionNames.MANAGE_CASES,
        routerLink: '/app/cases/manage',
      },
    ]
  },
  {
    label: 'Missing',
    icon: 'idcard',
    requiredModulePermissionName: ModulePermissionNames.MISSING_MODULE,
    children: [
      {
        label: 'Create Missing',
        requiredPermissionName: PermissionNames.CREATE_MISSING,
        routerLink: '/app/missing/create',
      },
      {
        label: 'Manage Missing',
        requiredPermissionName: PermissionNames.MANAGE_MISSING,
        routerLink: '/app/missing/manage',
      },
    ]
  },
  {
    label: 'Security',
    icon: 'lock',
    requiredModulePermissionName: ModulePermissionNames.SECURITY_MODULE,
    children: [
      {
        label: 'General',
        requiredPermissionName: PermissionNames.SECURITY_GENERAL,
        routerLink: '/app/security/general',
      },
      {
        label: 'Permissions',
        requiredPermissionName: PermissionNames.SECURITY_PERMISSIONS,
        routerLink: '/app/security/permissions',
      }
    ]
  },
  {
    label: 'Administration',
    routerLink: '/app/admin',
    icon: 'setting',
    requiredModulePermissionName: ModulePermissionNames.ADMINISTRATION_MODULE,
    children: [
      {
        label: 'Settings',
        requiredPermissionName: PermissionNames.SETTINGS,
        routerLink: '/app/admin/settings',
      },
      {
        label: 'User Accounts',
        requiredPermissionName: PermissionNames.USER_ACCOUNTS,
        routerLink: '/app/admin/user-accounts',
      },
    ]
  },
  // @Note: Below is an example of submenu link
  // {
  //   label: 'Settings',
  //   icon: 'setting',
  //   children: [
  //     {
  //       label: 'Settings Sub',
  //       routerLink: '/settings/sub',
  //     }
  //   ]
  // }
];
