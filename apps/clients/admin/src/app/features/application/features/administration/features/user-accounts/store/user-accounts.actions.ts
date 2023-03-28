import { createAction, createActionGroup, createFeature, emptyProps, props } from '@ngrx/store';

import { 
  Page, 
  PageRequest, 
  ResponseMessage, 
  UserAccountDto, 
  TemplateModulePermissionName, 
  UserPermission, 
  UserAccount } from '@vsp/clients/core';

import { TableDefinition } from '@vsp/clients/datatable';
import { BasicQuerySearchFilter } from '@vsp/query-search-filters';

export const UserAccountsActions = createActionGroup({
  source: 'User Accounts',
  events: {
    'Search User Accounts Request': props<{ filter: BasicQuerySearchFilter, pageRequest: PageRequest }>(),
    'Search User Accounts Request Success': props<{ page: Page<UserAccountDto> }>(),
    'Search User Accounts Request Failure': props<{ message: ResponseMessage }>(),
    'Create User Account Request': props<{ userAccount: UserAccount }>(),
    'Create User Account Request Success': props<{ message: ResponseMessage }>(),
    'Create User Account Request Failure': props<{ message: ResponseMessage }>(),
    'Set Create User Account Request Response Message': props<{ message: ResponseMessage | null }>(),
    'Get User Account By User Id Request': props<{ userId: string }>(),
    'Get User Account By User Id Request Success': props<{ user: UserAccountDto | null }>(),
    'Get User Account By User Id Request Failure': props<{ message: ResponseMessage }>(),
    'Set Selected User Account': props<{ user: UserAccountDto | null }>(),
    'Get User Permissions By User Id Request': props<{ userId: string }>(),
    'Get User Permissions By User Id Request Success': props<{ userPermissions: UserPermission[] | null }>(),
    'Get User Permissions By User Id Request Failure': props<{ message: ResponseMessage }>(),
    'Update User Account Request': props<{ userId: string, userAccount: UserAccount }>(),
    'Update User Account Request Success': props<{ message: ResponseMessage }>(),
    'Update User Account Request Failure': props<{ message: ResponseMessage }>(),
    'Set Update User Account Request Response Message': props<{ message: ResponseMessage | null }>(),
    'Set User Accounts Search Filter': props<{ filter: BasicQuerySearchFilter }>(),
    'Get All Template Module Permission Names Request': emptyProps(),
    'Get All Template Module Permission Names Request Success': props<{ templateModulePermissionNames: TemplateModulePermissionName[] }>(),
    'Get All Template Module Permission Names Request Failure': props<{ message: ResponseMessage }>(),
    'Set Template Module Permission Names': props<{ templateModulePermissionNames: TemplateModulePermissionName[] | null }>(),
    'Get Template Module Permission Name By Id Request': props<{ templateModulePermissionNameId: string }>(),
    'Get Template Module Permission Name By Id Request Success': props<{ templateModulePermissionName: TemplateModulePermissionName }>(),
    'Get Template Module Permission Name By Id Request Failure': props<{ message: ResponseMessage }>(),
    'Set Selected Template Module Permission Name': props<{ templateModulePermissionName: TemplateModulePermissionName | null }>(),
    'Reset Selected User Account State Slice': emptyProps(),
    'Set User Accounts Table Definition': props<{ tableDefinition: TableDefinition | null }>(),
    'Reset User Accounts Table Definition': emptyProps(),
  }
});
