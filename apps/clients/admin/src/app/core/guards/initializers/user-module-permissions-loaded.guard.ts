import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import { UserModulesAndPermissionsMap } from '@vsp/clients/core';

import { UserSelectors, UserState, UserActions } from '@vsp/admin/store/user';

@Injectable({
  providedIn: 'root'
})
export class UserModulePermissionsLoadedGuard implements CanActivate {
  private readonly _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._getUserSettingsFromStoreOrApi()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getUserSettingsFromStoreOrApi(): Observable<UserModulesAndPermissionsMap | null> {
    return this._store.select(UserSelectors.selectUserModulePermissionsMap)
      .pipe(
        tap(permissions => {
          if (!permissions) {
            this._store.dispatch(UserActions.getUserPermissionsRequest());
          }
        }),
        filter(permissions => !!permissions),
        take(1)
      );
  }
}
