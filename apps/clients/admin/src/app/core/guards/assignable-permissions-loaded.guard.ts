import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { PermissionsActions, PermissionsSelectors } from '@vsp/admin/store/permissions';
import { ModulePermission } from '@vsp/clients/core';

@Injectable({
  providedIn: 'root'
})
export class AssignablePermissionsLoadedGuard implements CanActivate {
  private readonly _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._getAssignablePermissionsFromStoreOrApi()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getAssignablePermissionsFromStoreOrApi(): Observable<ModulePermission[] | null> {
    return this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(
        tap(permissions => {
          if (!permissions) {
            this._store.dispatch(PermissionsActions.getAssignableModulePermissionsRequest());
          }
        }),
        filter(permissions => !!permissions),
        take(1)
      );
  }
}
