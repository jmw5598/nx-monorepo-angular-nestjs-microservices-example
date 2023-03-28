import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { 
  Credentials, 
  AuthenticatedUser, 
  RefreshTokenRequest,
  ResponseMessage } from '@vsp/clients/core';

export const AuthenticationActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Sign In User Request': props<{ credentials: Credentials }>(),
    'Sign In User Success': props<{ authenticatedUser: AuthenticatedUser }>(),
    'Sign In User Failure': props<{ message: ResponseMessage }>(),
    'Sign Out User Request': emptyProps(),
    'Sign Out User Success': emptyProps(),
    'Set Authenticated User': props<{ authenticatedUser: AuthenticatedUser | null }>(),
    'Refresh Access Token Request': props<{ refreshTokenRequest: RefreshTokenRequest }>(),
    'Refresh Access Token Request Success': props<{ authenticatedUser: AuthenticatedUser }>(),
    'Refresh Access Token Request Failure': props<{ message: ResponseMessage }>(),
    'Set Refresh Access Token Response Message': props<{ message: ResponseMessage | null }>()
  }
});
