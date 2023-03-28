import { createFeature, createReducer, on } from '@ngrx/store';
import { defaultBasicQuerySearchWithDeletedFilter } from '@vsp/admin/core/constants';

import { Page, ResponseMessage, TemplateModulePermissionName } from '@vsp/clients/core';
import { TableDefinition } from '@vsp/clients/datatable';
import { BasicQuerySearchFilter } from '@vsp/query-search-filters';
import { getDefaultSecurityPermissionsTableDefinition } from '../pages/security-permissions/security-permissions-table-definition.defaults';

import { SecurityPermissionsActions } from './security-permissions.actions';

export const securityPermissionsFeatureKey = 'securityPermissions';

export interface SecurityPermissionsState {
  createTemplateModulePermissionNameResponseMessage: ResponseMessage | null,
  updateTemplateModulePermissionNameResponseMessage: ResponseMessage | null,
  deleteTemplateModulePermissionNameResponseMessage: ResponseMessage | null,
  restoreTemplateModulePermissionNameResponseMessage: ResponseMessage | null,
  templateModulePermissionNamesPage: Page<any> | null,
  templateModulePermissionsSearchFilter: BasicQuerySearchFilter | null,
  securityPermissionsTableDefinition: TableDefinition | null,
  selectedTemplateModulePermissionName: TemplateModulePermissionName | null,
}

export const initialSecurityPermissionsState: SecurityPermissionsState = {
  createTemplateModulePermissionNameResponseMessage: null,
  updateTemplateModulePermissionNameResponseMessage: null,
  deleteTemplateModulePermissionNameResponseMessage: null,
  restoreTemplateModulePermissionNameResponseMessage: null,
  templateModulePermissionNamesPage: null,
  templateModulePermissionsSearchFilter: defaultBasicQuerySearchWithDeletedFilter,
  securityPermissionsTableDefinition: getDefaultSecurityPermissionsTableDefinition(),
  selectedTemplateModulePermissionName: null,
}

const handleSeachTemplateModulePermissionNamesRequestSuccess = (state: SecurityPermissionsState, { page }: any) => ({
  ...state,
  templateModulePermissionNamesPage: page
} as SecurityPermissionsState);

const handleSetTemplateModulePermissionsSearchFilter = (state: SecurityPermissionsState, { filter }: any) => ({
  ...state,
  templateModulePermissionsSearchFilter: filter
} as SecurityPermissionsState);

const handleCreateTemplateModulePermissionNameResponseMessage = (state: SecurityPermissionsState, { message }: any) => ({
  ...state,
  templateModulePermissionNamesPage: null,
  createTemplateModulePermissionNameResponseMessage: message
} as SecurityPermissionsState);

const handleUpdateTemplateModulePermissionNameResponseMessage = (state: SecurityPermissionsState, { message }: any) => ({
  ...state,
  templateModulePermissionNamesPage: null,
  updateTemplateModulePermissionNameResponseMessage: message
} as SecurityPermissionsState);

const handleGetTemplateModulePermissionNameByIdRequestSuccess = (state: SecurityPermissionsState, { templateModulePermissionName }: any) => ({
  ...state,
  selectedTemplateModulePermissionName: templateModulePermissionName
} as SecurityPermissionsState);

const handleDeleteTemplatePermissionModuleNameRequestSuccess = (state: SecurityPermissionsState, { templateModulePermissionName }: any) => {
  const templateModulePermissionNamesPage: Page<TemplateModulePermissionName> | null = !state?.templateModulePermissionNamesPage ? null : {
    ...state.templateModulePermissionNamesPage,
    elements: state.templateModulePermissionNamesPage
      ?.elements?.map((template: TemplateModulePermissionName) => {
        return template.id === templateModulePermissionName.id ? templateModulePermissionName : template
      }) 
      || []
  } as Page<TemplateModulePermissionName>;
  
  return {
    ...state,
    templateModulePermissionNamesPage: templateModulePermissionNamesPage
  } as SecurityPermissionsState
};

const handleRestoreTemplatePermissionModuleNameRequestSuccess = (state: SecurityPermissionsState, { templateModulePermissionName }: any) => {
  const templateModulePermissionNamesPage: Page<TemplateModulePermissionName> | null = !state?.templateModulePermissionNamesPage ? null : {
    ...state.templateModulePermissionNamesPage,
    elements: state.templateModulePermissionNamesPage
      ?.elements?.map((template: TemplateModulePermissionName) => {
        return template.id === templateModulePermissionName.id ? templateModulePermissionName : template
      }) 
      || []
  } as Page<TemplateModulePermissionName>;
  
  return {
    ...state,
    templateModulePermissionNamesPage: templateModulePermissionNamesPage
  } as SecurityPermissionsState
};

const handleSetDeleteTemplatePermissionModuleNameResponseMessage = (state: SecurityPermissionsState, { message }: any) => ({
  ...state,
  deleteTemplateModulePermissionNameResponseMessage: message
} as SecurityPermissionsState);

const handleSetRestoreTemplatePermissionModuleNameResponseMessage = (state: SecurityPermissionsState, { message }: any) => ({
  ...state,
  restoreTemplateModulePermissionNameResponseMessage: message
} as SecurityPermissionsState);

const handleSetSecurityPermissionsTableDefinition = (state: SecurityPermissionsState, { tableDefinition }: any) => ({
  ...state,
  securityPermissionsTableDefinition: tableDefinition
} as SecurityPermissionsState);

const handleResetSecurityPermissionsTableDefinition = (state: SecurityPermissionsState) => ({
  ...state,
  securityPermissionsTableDefinition: getDefaultSecurityPermissionsTableDefinition()
} as SecurityPermissionsState);

export const securityPermissionsFeature = createFeature({
  name: 'securityPermissions',
  reducer: createReducer(
    initialSecurityPermissionsState,
    on(
      SecurityPermissionsActions.searchTemplateModulePermissionsNamesRequestSuccess,
      handleSeachTemplateModulePermissionNamesRequestSuccess
    ),
    on(
      SecurityPermissionsActions.setTemplateModulePermissionsSearchFilter,
      handleSetTemplateModulePermissionsSearchFilter
    ),
    on(
      SecurityPermissionsActions.createTemplateModulePermissionNameRequestSuccess,
      SecurityPermissionsActions.setCreateTemplateModulePermissionNameResponseMessage,
      handleCreateTemplateModulePermissionNameResponseMessage
    ),
    on(
      SecurityPermissionsActions.updateTemplateModulePermissionNameRequestSuccess,
      SecurityPermissionsActions.setUpdateTemplateModulePermissionNameResponseMessage,
      handleUpdateTemplateModulePermissionNameResponseMessage
    ),
    on(
      SecurityPermissionsActions.getTemplateModulePermissionNameByIdRequestSuccess,
      SecurityPermissionsActions.setSelectedTemplateModulePermissionName,
      handleGetTemplateModulePermissionNameByIdRequestSuccess
    ),
    on(
      SecurityPermissionsActions.deleteTemplateModulePermissionNameRequestSuccess,
      handleDeleteTemplatePermissionModuleNameRequestSuccess
    ),
    on(
      SecurityPermissionsActions.setDeleteTemplateModulePermissionNameResponseMessage,
      handleSetDeleteTemplatePermissionModuleNameResponseMessage
    ),
    on(
      SecurityPermissionsActions.setSecurityPermissionsTableDefinition,
      handleSetSecurityPermissionsTableDefinition
    ),
    on(
      SecurityPermissionsActions.resetSecurityPermissionsTableDefinition,
      handleResetSecurityPermissionsTableDefinition
    ),
    on(
      SecurityPermissionsActions.restoreTemplateModulePermissionNameRequestSuccess,
      handleRestoreTemplatePermissionModuleNameRequestSuccess
    ),
    on(
      SecurityPermissionsActions.setRestoreTemplateModulePermissionNameResponseMessage,
      handleSetRestoreTemplatePermissionModuleNameResponseMessage
    )
  )
});
