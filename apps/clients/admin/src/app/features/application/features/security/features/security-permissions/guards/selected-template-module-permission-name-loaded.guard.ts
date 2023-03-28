import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

import { TemplateModulePermissionName } from '@vsp/clients/core';

import { SecurityPermissionsActions, SecurityPermissionsState, SecurityPermissionsSelectors } from '../store';

@Injectable({
  providedIn: 'root'
})
export class SelectedTemplateModulePermissionNameLoadedGuard implements CanActivate {
  private _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const templateModulePermissionNameId: string = route.params['templateModulePermissionNameId'] || '';
    return this._getSelectedTemplateModulePermissionNameFromStoreOrApi(templateModulePermissionNameId)
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getSelectedTemplateModulePermissionNameFromStoreOrApi(templateModulePermissionNameId: string): Observable<TemplateModulePermissionName | null> {
    return this._store.select(SecurityPermissionsSelectors.selectSelectedTemplateModulerPermissionName)
      .pipe(
        tap(template => {
          if (!template) {
            this._store.dispatch(
              SecurityPermissionsActions.getTemplateModulePermissionNameByIdRequest({ 
                templateModulePermissionNameId: templateModulePermissionNameId 
              })
            );
          }
        }),
        filter(template => !!template),
        take(1)
      );
  }
}
