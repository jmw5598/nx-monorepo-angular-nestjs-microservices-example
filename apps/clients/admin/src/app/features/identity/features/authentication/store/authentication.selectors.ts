import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState, authenticationFeature } from './authentication.reducer';

export const selectAuthenticationState = createFeatureSelector<AuthenticationState>(
  authenticationFeature.name
);

export const selectAuthenticatedUser = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.authenticatedUser
);

export const selectedSignInResponseMessage = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.signInResponseMessage
);

export const selectRefreshAccessTokenResponseMessage = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.refreshAccessTokenResponseMessage
);

export const AuthenticationSelectors = {
  selectAuthenticatedUser,
  selectAuthenticationState,
  selectRefreshAccessTokenResponseMessage,
  selectedSignInResponseMessage,
}
