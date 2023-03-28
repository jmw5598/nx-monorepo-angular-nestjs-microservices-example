import { createActionGroup, props } from '@ngrx/store';

import { 
  ForgotPassword,
  ResetPassword,
  ResponseMessage } from '@vsp/clients/core';

export const AccountsActions = createActionGroup({
  source: 'Accounts',
  events: {
    'Forgot Password Request': props<{ request: ForgotPassword }>(),
    'Forgot Password Request Success': props<{ message: ResponseMessage }>(),
    'Forgot Password Request Failure': props<{ message: ResponseMessage }>(),
    'Set Forgot Password Request Response Message': props<{ message: ResponseMessage | null }>(),
    'Reset Password Request': props<{ request: ResetPassword }>(),
    'Reset Password Request Success': props<{ message: ResponseMessage | null }>(),
    'Reset Password Request Failure': props<{ message: ResponseMessage | null }>(),
    'Set Reset Password Request Response Message': props<{ message: ResponseMessage | null }>()
  }
});
