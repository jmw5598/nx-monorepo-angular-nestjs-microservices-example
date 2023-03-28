import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, mergeMap, of, switchMap, tap } from 'rxjs';

import { ResponseMessage, ResponseStatus } from '@vsp/clients/core';


import { AccountsActions } from './accounts.actions';
import { AccountsService } from '../services/accounts.service';

@Injectable()
export class AccountsEffects {
  constructor(
    private _actions: Actions,
    private _accountsService: AccountsService,
    private _router: Router
  ) { }

  public forgotPasswordRequest$ = createEffect(() => this._actions
    .pipe(
      ofType(AccountsActions.forgotPasswordRequest),
      exhaustMap(({ request }) => this._accountsService.forgotPassword(request)
        .pipe(
          mergeMap(message => 
            of(AccountsActions.forgotPasswordRequestSuccess({ message }))),
          catchError(error => 
            of(AccountsActions.forgotPasswordRequestFailure({ message: {
              status: ResponseStatus.ERROR,
              message: error?.error?.message || 'Error sending password reset request!'
            } as ResponseMessage })))
        )
      )
    )
  );

  public resetPasswordRequest$ = createEffect(() => this._actions
    .pipe(
      ofType(AccountsActions.resetPasswordRequest),
      exhaustMap(({ request }) => this._accountsService.resetPassword(request)
        .pipe(
          mergeMap(message => 
            of(AccountsActions.resetPasswordRequestSuccess({ message }))),
          catchError(error => 
            of(AccountsActions.resetPasswordRequestFailure({ message: {
              status: ResponseStatus.ERROR,
              message: error?.error?.message || 'Error sending password reset request!'
            } as ResponseMessage })))
        )
      )
    )
  );
}
