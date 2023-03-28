import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, filter, mergeMap, Observable, of, switchMap, take, tap } from 'rxjs';

import { Page, TemplateModulePermissionName } from '@vsp/clients/core';
import { defaultBasicQuerySearchFilter, defaultPageRequest } from '@vsp/admin/core/constants';

import { SecurityPermissionsActions, SecurityPermissionsSelectors, SecurityPermissionsState } from '../store';
import { defaultSecurityPermissionsSort } from '../constants/sort.defaults';

@Injectable({
  providedIn: 'root'
})
export class InitialTemplateModulePermissionNamesSearchLoadedGuard implements CanActivate {
  private _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._getTemplateModulePermissionNamesPageFromStoreOrApi()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getTemplateModulePermissionNamesPageFromStoreOrApi(): Observable<Page<TemplateModulePermissionName> | null> {

    return combineLatest([
        this._store.select(SecurityPermissionsSelectors.selectTemplateModulePermissionSearchFilter),
        this._store.select(SecurityPermissionsSelectors.selectTemplateModulePermissionNamesPage)
      ])
      .pipe(tap(([filter, page]) => {
        if (!page) {
          this._store.dispatch(SecurityPermissionsActions.searchTemplateModulePermissionsNamesRequest({
            filter: filter || defaultBasicQuerySearchFilter,
            pageRequest: {
              ...defaultPageRequest,
              sort: {
                ...defaultSecurityPermissionsSort
              }
            }
          }));
        }
      }),
      filter(([filter, page]) => !!page),
      mergeMap(([filter, page]) => of(page)),
      take(1));
  }
}
