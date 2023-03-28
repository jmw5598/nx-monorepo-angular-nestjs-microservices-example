import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeature, UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>(
  userFeature.name
);

export const selectUserSettings = createSelector(
  selectUserState,
  (state: UserState) => state.userSettings
);

export const selectUserModulePermissionsMap = createSelector(
  selectUserState,
  (state: UserState) => state.userModulePermissionsMap
);

export const UserSelectors = {
  selectUserState,
  selectUserSettings,
  selectUserModulePermissionsMap
};
