import { inject, Injectable } from '@angular/core';
import { catchError, mergeMap, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ResponseMessage, ResponseStatus, Page, UserAccountDto, TemplateModulePermissionName, UserPermission } from '@vsp/clients/core';
import { PermissionsService, UsersService } from '@vsp/admin/core/services';

import { UserAccountsActions } from './user-accounts.actions';

@Injectable()
export class UserAccountsEffects {
  private readonly _actions: Actions = inject(Actions);
  private readonly _usersService: UsersService = inject(UsersService);
  private readonly _permissionsService: PermissionsService = inject(PermissionsService);

  public searchUserAccountsRequest = createEffect(() => this._actions
    .pipe(
      ofType(UserAccountsActions.searchUserAccountsRequest),
      switchMap(({ filter, pageRequest }) => 
        this._usersService.searchUsers(filter, pageRequest)
          .pipe(
            mergeMap((page: Page<UserAccountDto>) => of(UserAccountsActions.searchUserAccountsRequestSuccess({ page: page }))),
            catchError((error: any)=> of(UserAccountsActions.searchUserAccountsRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error.error || 'Error searching users!'
              } as ResponseMessage
            })))
          )
      )
    )
  );

  public createUserAccountRequest = createEffect(() => this._actions
    .pipe(
      ofType(UserAccountsActions.createUserAccountRequest),
      switchMap(({ userAccount }) => 
        this._usersService.createUserAccount(userAccount)
          .pipe(
            mergeMap((userDto: UserAccountDto) => of(UserAccountsActions.createUserAccountRequestSuccess({ 
              message: {
                status: ResponseStatus.SUCCESS,
                message: 'Successfully create new user account!'
              } as ResponseMessage
            }))),
            catchError((error: any) => {
              const message: string = error?.status === 403 
                ? 'Forbidden, you have reached your max allowed user!' 
                : error?.error ? error?.error : 'Error creating new user account!';
              
                return of(UserAccountsActions.createUserAccountRequestFailure({
                message: {
                  status: ResponseStatus.ERROR,
                  message: message
                } as ResponseMessage
              }))
            })
          )
      )
    )
  );

  public updateUserAccountRequest = createEffect(() => this._actions
    .pipe(
      ofType(UserAccountsActions.updateUserAccountRequest),
      switchMap(({ userId, userAccount }) => 
        this._usersService.updateUserAccount(userId, userAccount)
          .pipe(
            mergeMap((userDto: UserAccountDto) => of(UserAccountsActions.updateUserAccountRequestSuccess({ 
              message: {
                status: ResponseStatus.SUCCESS,
                message: 'Successfully updated user account!'
              } as ResponseMessage
            }))),
            catchError((error: any)=> of(UserAccountsActions.updateUserAccountRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error.error || 'Error updating user account!'
              } as ResponseMessage
            })))
          )
      )
    )
  );

  public getUserByUserIdRequest = createEffect(() => this._actions
    .pipe(
      ofType(UserAccountsActions.getUserAccountByUserIdRequest),
      switchMap(({ userId }) => 
        this._usersService.getUserByUserId(userId)
          .pipe(
            mergeMap((user: UserAccountDto) => 
              of(UserAccountsActions.getUserAccountByUserIdRequestSuccess({ user: user }))),
            catchError((error: any)=> of(UserAccountsActions.getUserAccountByUserIdRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error.error || 'Error getting user!'
              } as ResponseMessage
            })))
          )
      )
    )
  );

  public getUserPermissionsByUserIdRequest = createEffect(() => this._actions
    .pipe(
      ofType(UserAccountsActions.getUserPermissionsByUserIdRequest),
      switchMap(({ userId }) => 
        this._usersService.getUserPermissionsByUserId(userId)
          .pipe(
            mergeMap((permissions: UserPermission[]) => 
              of(UserAccountsActions.getUserPermissionsByUserIdRequestSuccess({ userPermissions: permissions }))),
            catchError((error: any)=> of(UserAccountsActions.getUserPermissionsByUserIdRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error.error || 'Error user permissions for user!'
              } as ResponseMessage
            })))
          )
      )
    )
  );

  public getAllTemplateModulePermissionNamesRequest = createEffect(() => this._actions
    .pipe(
      ofType(UserAccountsActions.getAllTemplateModulePermissionNamesRequest),
      switchMap(() => 
        this._permissionsService.getTemplateModulePermissionNames()
          .pipe(
            mergeMap((templateModulePermissionNames: TemplateModulePermissionName[]) => 
              of(UserAccountsActions
                .getAllTemplateModulePermissionNamesRequestSuccess({
                  templateModulePermissionNames: templateModulePermissionNames
                })
              )
            ),
            catchError((error: any)=> of(UserAccountsActions.getAllTemplateModulePermissionNamesRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error.error || 'Error getting permission templates!'
              } as ResponseMessage
            })))
          )
      )
    )
  );

  public getTemplateModulePermissionNameByIdRequest = createEffect(() => this._actions
    .pipe(
      ofType(UserAccountsActions.getTemplateModulePermissionNameByIdRequest),
      switchMap(({ templateModulePermissionNameId }) =>
        this._permissionsService.getTemplateModulePermissionNameById(templateModulePermissionNameId)
          .pipe(
            mergeMap((template: TemplateModulePermissionName) => of(
              UserAccountsActions.getTemplateModulePermissionNameByIdRequestSuccess({ 
                templateModulePermissionName: template 
              })
            )),
            catchError((error: any) => of(UserAccountsActions.getTemplateModulePermissionNameByIdRequestFailure({
              message: {
                status: ResponseStatus.ERROR,
                message: error?.error || 'Error getting permissions template'
              } as ResponseMessage
            })))
          )
      )
    )
  )
}
