import { createFeature, createReducer, on } from '@ngrx/store';
import { ResponseMessage } from '@vsp/clients/core';
import { AccountsActions } from './accounts.actions';

export interface AccountsState {
  forgotPasswordResponseMessage: ResponseMessage | null,
  resetPasswordRequestResponseMessage: ResponseMessage | null,
}

export const initialAccountsState: AccountsState = {
  forgotPasswordResponseMessage: null,
  resetPasswordRequestResponseMessage: null,
}

const handleForgotPasswordRequestResponse = (state: AccountsState, { message }: any) => ({
  ...state,
  forgotPasswordResponseMessage: message
} as AccountsState);

const handleResetPasswordRequestResponse = (state: AccountsState, { message }: any) => ({
  ...state,
  resetPasswordRequestResponseMessage: message
} as AccountsState);


export const accountsFeature = createFeature({
  name: 'accounts',
  reducer: createReducer(
    initialAccountsState,
    on(
      AccountsActions.forgotPasswordRequestSuccess, 
      AccountsActions.forgotPasswordRequestFailure,
      AccountsActions.setForgotPasswordRequestResponseMessage,
      handleForgotPasswordRequestResponse
    ),
    on(
      AccountsActions.resetPasswordRequestSuccess, 
      AccountsActions.resetPasswordRequestFailure,
      AccountsActions.setResetPasswordRequestResponseMessage,
      handleResetPasswordRequestResponse
    ),
  )
});
