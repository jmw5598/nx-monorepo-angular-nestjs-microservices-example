import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import { TemplateModulePermissionName } from '@vsp/clients/core';

import { UserAccountsActions, UserAccountsSelectors, UserAccountsState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class TemplateModulePermissionNamesLoadedGuard implements CanActivate {
  private _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._getTemplateModulePermissionNamesFromStoreOrApi()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getTemplateModulePermissionNamesFromStoreOrApi(): Observable<TemplateModulePermissionName[] | null> {
    return this._store.select(UserAccountsSelectors.selectTemplateModulePermissionNames)
      .pipe(tap((templateModulePermissionNames) => {
        if (!templateModulePermissionNames) {
          this._store.dispatch(UserAccountsActions.getAllTemplateModulePermissionNamesRequest());
        }
      }),
      filter((templateModulePermissionNames) => !!templateModulePermissionNames),
      take(1)
    );
  }
}
