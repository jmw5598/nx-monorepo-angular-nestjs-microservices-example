import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserSelectors } from '@vsp/admin/store/user';
import { PermissionNames, UserModulesAndPermissionsMap, UserPermission } from '@vsp/clients/core';

@Injectable({
  providedIn: 'root'
})
export class HasPermissionGuard implements CanActivate {
  private readonly _store: Store = inject(Store);
  private readonly _router: Router = inject(Router);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const permissionName: PermissionNames = route.data['requiredPermissionName'] as PermissionNames;
    
    return this._store.select(UserSelectors.selectUserModulePermissionsMap)
      .pipe(
        switchMap((permissions: UserModulesAndPermissionsMap | null) => {
          let hasPermission: boolean = false;

          if (
            permissions 
            && permissionName
            && permissions?.permissions?.hasOwnProperty(permissionName) 
            && permissionName
          ) {
            hasPermission = this._hasSomePermission(permissions.permissions[permissionName])
          }
          
          if (!hasPermission) {
            this._router.navigateByUrl('/error/403');
          }

          return of(hasPermission);
        }),
        catchError(() => {
          this._router.navigateByUrl('/error/403');
          return of(false);
        })
      );
  }

  private _hasSomePermission(permission: UserPermission): boolean {
    return permission.canCreate || permission.canRead || permission.canUpdate || permission.canDelete;
  }
}
