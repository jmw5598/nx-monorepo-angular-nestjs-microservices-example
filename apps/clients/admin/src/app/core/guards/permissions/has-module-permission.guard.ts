import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, switchMap } from 'rxjs';

import { UserSelectors } from '@vsp/admin/store/user';
import { ModulePermissionNames, UserModulesAndPermissionsMap } from '@vsp/clients/core';

@Injectable({
  providedIn: 'root'
})
export class HasModulePermissionGuard implements CanActivate {
  private readonly _store: Store = inject(Store);
  private readonly _router: Router = inject(Router);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const moduleName: ModulePermissionNames = route.data['requiredModulePermissionName'] as ModulePermissionNames;
    
    return this._store.select(UserSelectors.selectUserModulePermissionsMap)
      .pipe(
        switchMap((permissions: UserModulesAndPermissionsMap | null) => {
          const hasModulePermission: boolean = permissions ? (permissions?.modules[moduleName]?.hasAccess) || false : false;
          
          if (!hasModulePermission) {
            this._router.navigateByUrl('/error/403');
          }

          return of(hasModulePermission);
        }),
        catchError(() => {
          this._router.navigateByUrl('/error/403');
          return of(false);
        })
      );
  }
}
