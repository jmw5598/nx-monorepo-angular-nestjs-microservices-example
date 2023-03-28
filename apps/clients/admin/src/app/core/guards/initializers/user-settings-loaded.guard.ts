import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import { UserSettings } from '@vsp/clients/core';

import { UserActions, UserSelectors } from '@vsp/admin/store/user';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsLoadedGuard implements CanActivate {
  private readonly _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._getUserSettingsFromStoreOrApi()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getUserSettingsFromStoreOrApi(): Observable<UserSettings | null> {
    return this._store.select(UserSelectors.selectUserSettings)
      .pipe(
        tap(settings => {
          if (!settings) {
            this._store.dispatch(UserActions.getUserSettingsRequest());
          }
        }),
        filter(settings => !!settings),
        take(1)
      );
  }
}
