import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthenticatedStatus } from '@vsp/admin/core/models';

import * as fromAuthentication from '../store';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private _store: Store<fromAuthentication.AuthenticationState>,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("checking authenticationd");
    return this._isUserLoggedInFromStore().pipe(
      switchMap(() => of(true)),
      catchError(() => {
        console.log("user is not authenticated, retdirecting");
        this._router.navigateByUrl('/auth/sign-in');
        return of(false)
      })
    )
  }
  
  private _isUserLoggedInFromStore(): Observable<boolean> {
    return this._store.select(fromAuthentication.selectAuthenticatedUser)
      .pipe(switchMap(authenticatedUser => {
        if (authenticatedUser?.status === AuthenticatedStatus.AUTHENTICATED) {
          return of(true);
        }
        return throwError(() => new Error("Not Authenticated Error"));
      }));
  }
}
