import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountsState, accountsFeature } from './accounts.reducer';

export const selectAccountsState = createFeatureSelector<AccountsState>(
  accountsFeature.name
);

export const selectForgotPasswordRequestResponseMessage = createSelector(
  selectAccountsState,
  (state: AccountsState) => state.forgotPasswordResponseMessage
);

export const selectResetPasswordRequestResponseMessage = createSelector(
  selectAccountsState,
  (state: AccountsState) => state.resetPasswordRequestResponseMessage
);

export const AccountsSelectors = {
  selectForgotPasswordRequestResponseMessage,
  selectResetPasswordRequestResponseMessage,
}
