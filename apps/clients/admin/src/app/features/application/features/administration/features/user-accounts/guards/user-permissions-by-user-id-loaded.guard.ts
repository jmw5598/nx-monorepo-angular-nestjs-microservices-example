import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import { UserAccountsActions, UserAccountsSelectors, UserAccountsState } from '../store';
import { UserPermission } from '@vsp/clients/core';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsByUserIdLoadedGuard implements CanActivate {
  private _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const userId: string = route.params['userId'] || '';
    return this._getUserPermissionsByUserIdFromStoreOrApi(userId)
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getUserPermissionsByUserIdFromStoreOrApi(userId: string): Observable<UserPermission[] | null> {
    return this._store.select(UserAccountsSelectors.selectSelectedUsersPermissions)
      .pipe(
        tap(permissions => {
          if (!permissions) {
            this._store.dispatch(
              UserAccountsActions.getUserPermissionsByUserIdRequest({ userId: userId })
            );
          }
        }),
        filter(permissions => !!permissions),
        take(1)
      );
  }
}
