import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, mergeMap, of, switchMap, tap } from 'rxjs';

import { ResponseMessage, ResponseStatus } from '@vsp/clients/core';
import { AuthenticationService } from '../services/authentication.service';

import { AuthenticationActions } from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private _actions: Actions,
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) { }

  public signInUserReqeust$ = createEffect(() => this._actions
    .pipe(
      ofType(AuthenticationActions.signInUserRequest),
      exhaustMap(({ credentials }) => this._authenticationService.signInUser(credentials)
        .pipe(
          mergeMap(authenticatedUser => {
            this._authenticationService.cacheAuthenticatedUser(authenticatedUser);
            return of(AuthenticationActions.signInUserSuccess({ authenticatedUser: authenticatedUser }))
          }),
          catchError(error => {
            return of(AuthenticationActions.signInUserFailure({ message: {
              status: ResponseStatus.ERROR,
              message: error?.error?.message || 'Invalid username/password!'
            } as ResponseMessage }))
          })
        )
      )
    )
  );

  public signInUserSuccess$ = createEffect(() => this._actions
    .pipe(
      ofType(AuthenticationActions.signInUserSuccess),
      tap(message => this._router.navigateByUrl('/auth/signing-in'))
    ),
    { dispatch: false }
  );

  public refrshRequest$ = createEffect(() => this._actions
    .pipe(
      ofType(AuthenticationActions.refreshAccessTokenRequest),
      exhaustMap(({ refreshTokenRequest }) => this._authenticationService.refreshToken(refreshTokenRequest)
        .pipe(
          mergeMap(authenticatedUser => {
            this._authenticationService.cacheAuthenticatedUser(authenticatedUser);
            return of(AuthenticationActions.refreshAccessTokenRequestSuccess({ authenticatedUser: authenticatedUser }))
          }),
          catchError(error => {
            console.log('effect, error refreshign access token')
            return of(AuthenticationActions.refreshAccessTokenRequestFailure({ message: {
              status: ResponseStatus.ERROR,
              message: error?.error?.message || 'Invalid username/password!'
            } as ResponseMessage }))
          })
        )
      )
    )
  );

  public signOutUserRequest$ = createEffect(() => this._actions
    .pipe(
      ofType(AuthenticationActions.signOutUserRequest),
      switchMap(() => {
        this._authenticationService.removeCachedAuthenticatedUser();
        return of(AuthenticationActions.signOutUserSuccess());
      })
    )
  );
}
