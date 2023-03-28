import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SecurityPermissionsState, securityPermissionsFeature } from './security-permissions.reducer';

export const selectSecurityPermissionsState = createFeatureSelector<SecurityPermissionsState>(
  securityPermissionsFeature.name
);

export const selectTemplateModulePermissionNamesPage = createSelector(
  selectSecurityPermissionsState,
  (state: SecurityPermissionsState) => state.templateModulePermissionNamesPage
);

export const selectTemplateModulePermissionSearchFilter = createSelector(
  selectSecurityPermissionsState,
  (state: SecurityPermissionsState) => state.templateModulePermissionsSearchFilter
);

export const selectCreateTemplateModulePermissionNameResponseMessage = createSelector(
  selectSecurityPermissionsState,
  (state: SecurityPermissionsState) => state.createTemplateModulePermissionNameResponseMessage
);

export const selectUpdateTemplateModulePermissionNameResponseMessage = createSelector(
  selectSecurityPermissionsState,
  (state: SecurityPermissionsState) => state.updateTemplateModulePermissionNameResponseMessage
);

export const selectSelectedTemplateModulerPermissionName = createSelector(
  selectSecurityPermissionsState,
  (state: SecurityPermissionsState) => state.selectedTemplateModulePermissionName
);

export const selectDeleteTemplateModulePermissionNameResponseMessage = createSelector(
  selectSecurityPermissionsState,
  (state: SecurityPermissionsState) => state.deleteTemplateModulePermissionNameResponseMessage
);

export const selectSecurityPermissionsTableDefinition = createSelector(
  selectSecurityPermissionsState,
  (state: SecurityPermissionsState) => state.securityPermissionsTableDefinition
);

export const selectRestoreTemplateModulePermissionNameResponseMessage = createSelector(
  selectSecurityPermissionsState,
  (state: SecurityPermissionsState) => state.deleteTemplateModulePermissionNameResponseMessage
);

export const SecurityPermissionsSelectors = {
  selectSecurityPermissionsState,
  selectTemplateModulePermissionNamesPage,
  selectTemplateModulePermissionSearchFilter,
  selectCreateTemplateModulePermissionNameResponseMessage,
  selectUpdateTemplateModulePermissionNameResponseMessage,
  selectSelectedTemplateModulerPermissionName,
  selectDeleteTemplateModulePermissionNameResponseMessage,
  selectSecurityPermissionsTableDefinition,
  selectRestoreTemplateModulePermissionNameResponseMessage,
};
