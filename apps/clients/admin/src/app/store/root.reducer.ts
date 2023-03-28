import { InjectionToken } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';

import { environment } from '@vsp/admin/env/environment';

import { AuthenticationEffects, AuthenticationState, authenticationFeature, AuthenticationActions } from '@vsp/admin/features/identity/features/authentication/store';
import { UserEffects, UserState, userFeature } from './user';
import { FilesEffects, FilesState, filesFeature } from './files';
import { PermissionsEffects, PermissionsState, permissionsFeature } from './permissions';

export interface RootState {
  [authenticationFeature.name]: AuthenticationState,
  [userFeature.name]: UserState,
  [filesFeature.name]: FilesState,
  [permissionsFeature.name]: PermissionsState,
  // router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<RootState, Action>>(
  'Root reducers token', {
  factory: () => ({
    [authenticationFeature.name]: authenticationFeature.reducer,
    [userFeature.name]: userFeature.reducer,
    [filesFeature.name]: filesFeature.reducer,
    [permissionsFeature.name]: permissionsFeature.reducer,
    // router: fromRouter.routerReducer,
  }),
});

import { MetaReducer } from '@ngrx/store';

export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

// Meta reducer to reset state on signOut
export function resetState(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return (state, action) => {
    if (action.type === AuthenticationActions.signOutUserSuccess.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? [logger, resetState]
  : [resetState];

export const rootEffects: any[] = [
  AuthenticationEffects,
  UserEffects,
  FilesEffects,
  PermissionsEffects,
];

export const storeModuleRuntimeChecks = {
  // strictStateImmutability and strictActionImmutability are enabled by default
  strictStateSerializability: true,
  strictActionSerializability: true,
  strictActionWithinNgZone: true,
  strictActionTypeUniqueness: true,
};
