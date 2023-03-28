import { Injectable } from '@angular/core';
import { catchError, mergeMap, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserActions } from './user.actions';
import { ResponseMessage, ResponseStatus } from '@vsp/clients/core';
import { UsersService } from '@vsp/admin/core/services';

@Injectable()
export class UserEffects {
  constructor(
    private _actions: Actions,
    private _usersService: UsersService
  ) { }

  public getUserSettingsRequest$ = createEffect(() => this._actions
    .pipe(
      ofType(UserActions.getUserSettingsRequest),
      switchMap(() => this._usersService.getUserSettings()
        .pipe(
          mergeMap(settings => of(UserActions.getUserSettingsRequestSuccess({ settings: settings }))),
          catchError(error => {
            return of(UserActions.getUserSettingsRequestFailure({ message: {
              status: ResponseStatus.ERROR,
              message: error?.error || 'Error getting user settings!'
            } as ResponseMessage}))
          }))   
        )
      )
    );

  public getUserPermissionsRequest$ = createEffect(() => this._actions
    .pipe(
      ofType(UserActions.getUserPermissionsRequest),
      switchMap(() => this._usersService.getUserPermissions()
        .pipe(
          mergeMap(userModulePermissions => of(UserActions.getUserPermissionsRequestSuccess({ userModulePermissions: userModulePermissions }))),
          catchError(error => {
            return of(UserActions.getUserPermissionsRequestFailure({ message: {
              status: ResponseStatus.ERROR,
              message: error?.error || 'Error getting user permissions!'
            } as ResponseMessage}))
          }))   
        )
      )
    );
}
