import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserAccountsState,  userAccountsFeature } from './user-accounts.reducer';

export const selectUserAccountsState = createFeatureSelector<UserAccountsState>(
  userAccountsFeature.name
);

export const selectUserAccountsPage = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state?.userAccountsPage || null
);

export const selectCreateUserAccountResponseMessage = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state?.createUserAccountResponseMessage || null
);

export const selectUpdateUserAccountResponseMessage = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state?.updateUserAccountResponseMessage || null
);

export const selectSelectedUsersPermissions = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state?.selectedUsersPermissions || null
);

export const selectSelectedUserAccount = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state.selectedUserAccount
);

export const selectUserAccountSearchFilter = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state.userAccountsSearchFilter
);

export const selectTemplateModulePermissionNames = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state.templateModulePermissionNames
);

export const selectSelectedTemplateModulePermissionName = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state.selectedTemplateModulePermissionName
);

export const selectUserAccountsTableDefinition = createSelector(
  selectUserAccountsState,
  (state: UserAccountsState) => state.userAccountsTableDefinition
);

export const UserAccountsSelectors = {
  selectUserAccountsState,
  selectUserAccountsPage,
  selectCreateUserAccountResponseMessage,
  selectUpdateUserAccountResponseMessage,
  selectSelectedUsersPermissions,
  selectSelectedUserAccount,
  selectUserAccountSearchFilter,
  selectTemplateModulePermissionNames,
  selectSelectedTemplateModulePermissionName,
  selectUserAccountsTableDefinition,
};
