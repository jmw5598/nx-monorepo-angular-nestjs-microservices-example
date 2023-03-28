import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, filter, mergeMap, Observable, of, switchMap, take, tap } from 'rxjs';

import { Page, UserAccountDto } from '@vsp/clients/core'
import { defaultBasicQuerySearchFilter, defaultPageRequest } from '@vsp/admin/core/constants';

import { defaultUserAccountsSort } from '../constants/sort.defaults';
import { UserAccountsActions, UserAccountsState, UserAccountsSelectors } from '../store';

@Injectable({
  providedIn: 'root'
})
export class InitialUserAccountsSearchLoadedGuard implements CanActivate {
  private readonly _store: Store = inject(Store);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._getUserAccountsPageFromStoreOrApi()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
  
  private _getUserAccountsPageFromStoreOrApi(): Observable<Page<UserAccountDto> | null> {
    return combineLatest([
        this._store.select(UserAccountsSelectors.selectUserAccountSearchFilter),
        this._store.select(UserAccountsSelectors.selectUserAccountsPage)
      ])
      .pipe(tap(([filter, page]) => {
        if (!page) {
          this._store.dispatch(UserAccountsActions.searchUserAccountsRequest({
            filter: filter || defaultBasicQuerySearchFilter,
            pageRequest: {
              ...defaultPageRequest,
              sort: {
                ...defaultUserAccountsSort
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
