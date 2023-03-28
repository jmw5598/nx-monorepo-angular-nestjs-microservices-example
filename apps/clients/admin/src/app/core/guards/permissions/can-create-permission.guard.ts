import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, switchMap } from 'rxjs';

import { UserSelectors } from '@vsp/admin/store/user';
import { PermissionNames, UserModulesAndPermissionsMap } from '@vsp/clients/core';

@Injectable({
  providedIn: 'root'
})
export class CanCreatePermissionGuard implements CanActivate {
  private readonly _store: Store = inject(Store);
  private readonly _router: Router = inject(Router);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const permissionName: PermissionNames = route.data['requiredPermissionName'] as PermissionNames;
    
    return this._store.select(UserSelectors.selectUserModulePermissionsMap)
      .pipe(
        switchMap((permissions: UserModulesAndPermissionsMap | null) => {
          const hasCreatePermission: boolean = permissions ? (permissions?.permissions[permissionName]?.canCreate || false) : false;

          if (!hasCreatePermission) {
            this._router.navigateByUrl('/error/403');
          }

          return of(hasCreatePermission);
        }),
        catchError(() => {
          this._router.navigateByUrl('/error/403');
          return of(false);
        })
      );
  }
}
