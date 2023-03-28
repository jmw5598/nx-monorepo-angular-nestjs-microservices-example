import { createFeature, createReducer, on } from '@ngrx/store';

import { ModulePermission } from '@vsp/clients/core';

import { PermissionsActions } from './permissions.actions';

export interface PermissionsState {
  assignableModulePermissions: ModulePermission[] | null
}

export const initialPermissionsState: PermissionsState = {
  assignableModulePermissions: null
}

const handleGetAssignableModulePermissionsRequestSuccess = (state: PermissionsState, { permissions }: any) => ({
  ...state,
  assignableModulePermissions: permissions
} as PermissionsState);

export const permissionsFeature = createFeature({
  name: 'permissions',
  reducer: createReducer(
    initialPermissionsState,
    on(
      PermissionsActions.getAssignableModulePermissionsRequestSuccess,
      handleGetAssignableModulePermissionsRequestSuccess
    )
  )
});
