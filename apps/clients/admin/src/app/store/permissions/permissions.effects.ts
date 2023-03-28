import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of, switchMap } from 'rxjs';

import { PermissionsService } from '@vsp/admin/core/services';

import { ModulePermission, ResponseMessage, ResponseStatus } from '@vsp/clients/core';

import { PermissionsActions } from './permissions.actions';

@Injectable()
export class PermissionsEffects {
  constructor(
    private _actions: Actions,
    private _permissionsService: PermissionsService
  ) { }

  public getAssignablePermissionRequest = createEffect(() => this._actions
    .pipe(
      ofType(PermissionsActions.getAssignableModulePermissionsRequest),
      switchMap(() => 
        this._permissionsService.getAssignableModulePermission()
          .pipe(
            mergeMap((permissions: ModulePermission[]) => of(PermissionsActions.getAssignableModulePermissionsRequestSuccess({ permissions: permissions }))),
            catchError((error: any)=> of(PermissionsActions.getAssignableModulePermissionsRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error.error || 'Error searching users!'
              } as ResponseMessage
            })))
          )
      )
    )
  );
}
