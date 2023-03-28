import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Page, ResponseMessage, ResponseStatus, TemplateModulePermissionName } from '@vsp/clients/core';
import { PermissionsService } from '@vsp/admin/core/services';
import { catchError, exhaustMap, mergeMap, of, switchMap } from 'rxjs';

import { SecurityPermissionsActions } from './security-permissions.actions';

@Injectable()
export class SecurityPermissionsEffects {
  private readonly _actions: Actions = inject(Actions);
  private readonly _permissionsService: PermissionsService = inject(PermissionsService);

  public createTemplateModulePermissionNameRequest = createEffect(() => this._actions
    .pipe(
      ofType(SecurityPermissionsActions.createTemplateModulePermissionNameRequest),
      exhaustMap(({ templateModulePermissionName }) => 
        this._permissionsService.createTemplateModulePermissionName(templateModulePermissionName)
          .pipe(
            mergeMap((templateModulePermission) => of(SecurityPermissionsActions.createTemplateModulePermissionNameRequestSuccess({
              message: {
                status: ResponseStatus.SUCCESS,
                message: 'Successfully created permission template!'
              } as ResponseMessage
            }))),
            catchError((error: any) => of(SecurityPermissionsActions.createTemplateModulePermissionNameRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error?.error || 'Error creating permission template!'
              } as ResponseMessage
            })))
          )
      )
    )
  );

  public updateTemplateModulePermissionNameRequest = createEffect(() => this._actions
    .pipe(
      ofType(SecurityPermissionsActions.updateTemplateModulePermissionNameRequest),
      exhaustMap(({ templateModulePermissionNameId, templateModulePermissionName }) => 
        this._permissionsService.updateTemplateModulePermissionName(templateModulePermissionNameId, templateModulePermissionName)
          .pipe(
            mergeMap((templateModulePermission) => of(SecurityPermissionsActions.updateTemplateModulePermissionNameRequestSuccess({
              message: {
                status: ResponseStatus.SUCCESS,
                message: 'Successfully created permission template!'
              } as ResponseMessage
            }))),
            catchError((error: any) => of(SecurityPermissionsActions.updateTemplateModulePermissionNameRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error?.error || 'Error creating permission template!'
              } as ResponseMessage
            })))
          )
      )
    )
  );

  public searchTemplateModulePermissionNamesRequest = createEffect(() => this._actions
    .pipe(
      ofType(SecurityPermissionsActions.searchTemplateModulePermissionsNamesRequest),
      switchMap(({ filter, pageRequest }) => 
        this._permissionsService.searchTemplateModulePermissionNames(filter, pageRequest)
          .pipe(
            mergeMap((page: Page<TemplateModulePermissionName>) => of(SecurityPermissionsActions.searchTemplateModulePermissionsNamesRequestSuccess({ page: page }))),
            catchError((error: any) => of(SecurityPermissionsActions.searchTemplateModulePermissionsNamesRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error.error || 'Error searching permissions templates!'
              } as ResponseMessage
            })))
          )
      )
    )
  );

  public getTemplateModulePermissionNameByIdRequest = createEffect(() => this._actions
    .pipe(
      ofType(SecurityPermissionsActions.getTemplateModulePermissionNameByIdRequest),
      switchMap(({ templateModulePermissionNameId }) =>
        this._permissionsService.getTemplateModulePermissionNameById(templateModulePermissionNameId)
          .pipe(
            mergeMap((template: TemplateModulePermissionName) => of(
              SecurityPermissionsActions.getTemplateModulePermissionNameByIdRequestSuccess({ 
                templateModulePermissionName: template 
              })
            )),
            catchError((error: any) => of(SecurityPermissionsActions.getTemplateModulePermissionNameByIdRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error?.error || 'Error getting permissions template'
              } as ResponseMessage
            })))
          )
      )
    )
  )

  public deleteTemplateModulePermissionNameRequest = createEffect(() => this._actions
    .pipe(
      ofType(SecurityPermissionsActions.deleteTemplateModulePermissionNameRequest),
      switchMap(({ templateModulePermissionNameId }) =>
        this._permissionsService.deleteTemplateModulePermissionNameById(templateModulePermissionNameId)
          .pipe(
            mergeMap((template: TemplateModulePermissionName) => of(
              SecurityPermissionsActions.deleteTemplateModulePermissionNameRequestSuccess({ 
                templateModulePermissionName: template 
              })
            )),
            catchError((error: any) => of(SecurityPermissionsActions.deleteTemplateModulePermissionNameRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error?.error || 'Error deleting permissions template'
              } as ResponseMessage
            })))
          )
      )
    )
  )

  public deleteTemplateModulePermissionNameRequestSuccess = createEffect(() => this._actions
    .pipe(
      ofType(SecurityPermissionsActions.deleteTemplateModulePermissionNameRequestSuccess),
      mergeMap(({ templateModulePermissionName }) => of(
        SecurityPermissionsActions.setDeleteTemplateModulePermissionNameResponseMessage({ 
          message: {
            status: ResponseStatus.SUCCESS,
            message: 'Successfully deleted permissions template!'
          } as ResponseMessage
        })
      )),
      catchError((error: any) => of(
        SecurityPermissionsActions.setDeleteTemplateModulePermissionNameResponseMessage({
          message: {
            status: ResponseStatus.ERROR,
            message: error?.error || 'Error deleting permissions template!'
          } as ResponseMessage
        })
      ))
    )
  )

  public restoreTemplateModulePermissionNameRequest = createEffect(() => this._actions
    .pipe(
      ofType(SecurityPermissionsActions.restoreTemplateModulePermissionNameRequest),
      switchMap(({ templateModulePermissionNameId }) =>
        this._permissionsService.restoreTemplateModulePermissionNameById(templateModulePermissionNameId)
          .pipe(
            mergeMap((template: TemplateModulePermissionName) => of(
              SecurityPermissionsActions.restoreTemplateModulePermissionNameRequestSuccess({ 
                templateModulePermissionName: template 
              })
            )),
            catchError((error: any) => of(SecurityPermissionsActions.setRestoreTemplateModulePermissionNameResponseMessage({
              message: {
                status: ResponseStatus.ERROR,
                message: error?.error || 'Error restoring permissions template'
              } as ResponseMessage
            })))
          )
      )
    )
  )

  public restoreTemplateModulePermissionNameRequestSuccess = createEffect(() => this._actions
    .pipe(
      ofType(SecurityPermissionsActions.restoreTemplateModulePermissionNameRequestSuccess),
      mergeMap(({ templateModulePermissionName }) => of(
        SecurityPermissionsActions.setRestoreTemplateModulePermissionNameResponseMessage({ 
          message: {
            status: ResponseStatus.SUCCESS,
            message: 'Successfully restored permissions template!'
          } as ResponseMessage
        })
      )),
      catchError((error: any) => of(
        SecurityPermissionsActions.setRestoreTemplateModulePermissionNameResponseMessage({
          message: {
            status: ResponseStatus.ERROR,
            message: error?.error || 'Error restoring permissions template!'
          } as ResponseMessage
        })
      ))
    )
  )
}