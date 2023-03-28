import { createFeature, createReducer, on } from '@ngrx/store';
import { ResponseMessage, AuthenticatedUser } from '@vsp/clients/core';
import { AuthenticationActions } from './authentication.actions';

export interface AuthenticationState {
  signInResponseMessage: ResponseMessage | null,
  refreshAccessTokenResponseMessage: ResponseMessage | null,
  authenticatedUser: AuthenticatedUser | null,
}

export const initialAuthenticationState: AuthenticationState = {
  signInResponseMessage: null,
  refreshAccessTokenResponseMessage: null,
  authenticatedUser: null,
}

const handleSignInUserSuccess = (state: AuthenticationState, { authenticatedUser }: any) => ({
  ...state,
  authenticatedUser: authenticatedUser,
  signInResponseMessage: null
} as AuthenticationState);

const handleSignInUserFailure = (state: AuthenticationState, { message }: any) => ({
  ...state,
  signInResponseMessage: message
} as AuthenticationState);

const handleSignOutUserSuccess = (state: AuthenticationState) => ({
  ...state,
  authenticatedUser: null,
  signInResponseMessage: null,
  passwordResetRequestResponseMessage: null,
  resetPasswordRequestResponseMessage: null,
} as AuthenticationState);

const handleSetAuthenticatedUser = (state: AuthenticationState, { authenticatedUser }: any) => ({
  ...state,
  authenticatedUser: authenticatedUser
} as AuthenticationState);

const handleRefreshTokenRequestSuccess = (state: AuthenticationState, { authenticatedUser }: any) => ({
  ...state,
  authenticatedUser: authenticatedUser
} as AuthenticationState);

const handleSetRefreshTokenResponseMessage = (state: AuthenticationState, { message }: any) => ({
  ...state,
  refreshAccessTokenResponseMessage: message
} as AuthenticationState);

export const authenticationFeature = createFeature({
  name: 'authentication',
  reducer: createReducer(
    initialAuthenticationState,
    on(
      AuthenticationActions.signInUserSuccess, 
      handleSignInUserSuccess
    ),
    on(
      AuthenticationActions.signInUserFailure, 
      handleSignInUserFailure
    ),
    on(
      AuthenticationActions.signOutUserSuccess, 
      handleSignOutUserSuccess
    ),
    on(
      AuthenticationActions.setAuthenticatedUser, 
      handleSetAuthenticatedUser
    ),
    on(
      AuthenticationActions.refreshAccessTokenRequestSuccess,
      handleRefreshTokenRequestSuccess
    ),
    on(
      AuthenticationActions.refreshAccessTokenRequestFailure,
      AuthenticationActions.setRefreshAccessTokenResponseMessage,
      handleSetRefreshTokenResponseMessage
    ),
  )
});
