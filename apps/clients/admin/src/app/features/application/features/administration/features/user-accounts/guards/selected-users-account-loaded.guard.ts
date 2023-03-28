import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import { UserAccountDto } from '@vsp/clients/core';
import { UserAccountsActions, UserAccountsSelectors, UserAccountsState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class SelectedUsersAccountLoadedGuard implements CanActivate {
  private readonly _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const userId: string = route.params['userId'] || '';
    return this._getUserAccountByUserIdFromStoreOrApi(userId)
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getUserAccountByUserIdFromStoreOrApi(userId: string): Observable<UserAccountDto | null> {
    return this._store.select(UserAccountsSelectors.selectSelectedUserAccount)
      .pipe(
        tap(account => {
          if (!account) {
            this._store.dispatch(
              UserAccountsActions.getUserAccountByUserIdRequest({ userId: userId })
            );
          }
        }),
        filter(account => !!account),
        take(1)
      );
  }
}
