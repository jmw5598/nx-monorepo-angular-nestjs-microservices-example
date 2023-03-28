import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PermissionsState, permissionsFeature } from './permissions.reducer';

export const selectPermissionsState = createFeatureSelector<PermissionsState>(
  permissionsFeature.name
);

export const selectAssignableModulePermissions = createSelector(
  selectPermissionsState,
  (state: PermissionsState) => state.assignableModulePermissions
);

export const PermissionsSelectors = {
  selectPermissionsState,
  selectAssignableModulePermissions
};
