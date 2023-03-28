import { createFeature, createReducer, on } from '@ngrx/store';
import { defaultBasicQuerySearchFilter } from '@vsp/admin/core/constants';

import { UserAccountDto, TemplateModulePermissionName, UserPermission, Page, ResponseMessage } from '@vsp/clients/core';
import { TableDefinition } from '@vsp/clients/datatable';
import { BasicQuerySearchFilter } from '@vsp/query-search-filters';

import { getDefaultUserAccountsTableDefinition } from '../pages/user-accounts-overview/user-accounts-table-definition.defaults';

import { UserAccountsActions } from './user-accounts.actions';

export interface UserAccountsState {
  userAccountsPage: Page<UserAccountDto> | null,
  userAccountsSearchFilter: BasicQuerySearchFilter | null,
  userAccountsTableDefinition: TableDefinition | null,
  createUserAccountResponseMessage: ResponseMessage | null,
  updateUserAccountResponseMessage: ResponseMessage | null,
  selectedUserAccount: UserAccountDto | null,
  selectedUsersPermissions: UserPermission[] | null,
  templateModulePermissionNames: TemplateModulePermissionName[] | null,
  selectedTemplateModulePermissionName: TemplateModulePermissionName | null,
}

export const initialUserAccountsState: UserAccountsState = {
  userAccountsPage: null,
  userAccountsSearchFilter: defaultBasicQuerySearchFilter,
  userAccountsTableDefinition: getDefaultUserAccountsTableDefinition(),
  createUserAccountResponseMessage: null,
  updateUserAccountResponseMessage: null,
  selectedUserAccount: null,
  selectedUsersPermissions: null,
  templateModulePermissionNames: null,
  selectedTemplateModulePermissionName: null,
}

const handleSearchUserAccountsRequestSuccess = (state: UserAccountsState, { page }: any) => ({
  ...state,
  userAccountsPage: page
} as UserAccountsState);

const handleCreateUserAccountRequestSuccess = (state: UserAccountsState, { message }: any) => ({
  ...state,
  userAccountsPage: null,
  createUserAccountResponseMessage: message
} as UserAccountsState);

const handleUpdateUserAccountRequestSuccess = (state: UserAccountsState, { message }: any) => ({
  ...state,
  userAccountsPage: null,
  updateUserAccountResponseMessage: message
} as UserAccountsState);

const handleGetUserPermissionsByUserIdRequestSuccess = (state: UserAccountsState, { userPermissions }: any) => ({
  ...state,
  selectedUsersPermissions: userPermissions
} as UserAccountsState);

const handleGetUserAccountByUserIdRequestSuccess = (state: UserAccountsState, { user }: any) => ({
  ...state,
  selectedUserAccount: user
} as UserAccountsState);

const handleSetUserAccountsSearchFilter = (state: UserAccountsState, { filter }: any) => ({
  ...state,
  userAccountsSearchFilter: filter
} as UserAccountsState);

const handleGetTemplateModulePermissionNamesRequestSuccess = (state: UserAccountsState, { templateModulePermissionNames }: any) => ({
  ...state,
  templateModulePermissionNames: templateModulePermissionNames
} as UserAccountsState);

const handleGetTemplateModulePermissionNameByIdRequestSuccess = (state: UserAccountsState, { templateModulePermissionName }: any) => ({
  ...state,
  selectedTemplateModulePermissionName: templateModulePermissionName
} as UserAccountsState);

const handleSetUserAccountsTableDefinition = (state: UserAccountsState, { tableDefinition }: any) => ({
  ...state,
  userAccountsTableDefinition: tableDefinition
} as UserAccountsState);

const handleResetUserAccountsTableDefinition = (state: UserAccountsState) => ({
  ...state,
  userAccountsTableDefinition: getDefaultUserAccountsTableDefinition()
} as UserAccountsState);

const handleResetSelectedUserAccountStateSlice = (state: UserAccountsState) => ({
  ...state,
  selectedUserAccount: null,
  selectedTemplateModulePermissionName: null,
  templateModulePermissionNames: null
} as UserAccountsState)

export const userAccountsFeature = createFeature({
  name: 'userAccounts',
  reducer: createReducer(
    initialUserAccountsState,
    on(
      UserAccountsActions.searchUserAccountsRequestSuccess,
      handleSearchUserAccountsRequestSuccess
    ),
    on(
      UserAccountsActions.createUserAccountRequestSuccess,
      UserAccountsActions.setCreateUserAccountRequestResponseMessage,
      UserAccountsActions.createUserAccountRequestFailure,
      handleCreateUserAccountRequestSuccess
    ),
    on(
      UserAccountsActions.updateUserAccountRequestSuccess,
      UserAccountsActions.setUpdateUserAccountRequestResponseMessage,
      handleUpdateUserAccountRequestSuccess
    ),
    on(
      UserAccountsActions.getUserPermissionsByUserIdRequestSuccess,
      handleGetUserPermissionsByUserIdRequestSuccess
    ),
    on(
      UserAccountsActions.getUserAccountByUserIdRequestSuccess,
      UserAccountsActions.setSelectedUserAccount,
      handleGetUserAccountByUserIdRequestSuccess
    ),
    on(
      UserAccountsActions.setUserAccountsSearchFilter,
      handleSetUserAccountsSearchFilter
    ),
    on(
      UserAccountsActions.getAllTemplateModulePermissionNamesRequestSuccess,
      UserAccountsActions.setTemplateModulePermissionNames,
      handleGetTemplateModulePermissionNamesRequestSuccess
    ),
    on(
      UserAccountsActions.getTemplateModulePermissionNameByIdRequestSuccess,
      UserAccountsActions.setSelectedTemplateModulePermissionName,
      handleGetTemplateModulePermissionNameByIdRequestSuccess
    ),
    on(
      UserAccountsActions.resetSelectedUserAccountStateSlice,
      handleResetSelectedUserAccountStateSlice
    ),
    on(
      UserAccountsActions.setUserAccountsTableDefinition,
      handleSetUserAccountsTableDefinition
    ),
    on(
      UserAccountsActions.resetUserAccountsTableDefinition,
      handleResetUserAccountsTableDefinition
    )
  )
});
