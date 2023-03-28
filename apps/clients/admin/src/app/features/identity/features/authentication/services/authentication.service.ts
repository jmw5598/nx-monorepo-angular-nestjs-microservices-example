import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpContext } from '@angular/common/http';

import { 
  EnvironmentService, 
  ICacheService, 
  CACHE_SERVICE, 
  ResetPassword, 
  AuthenticatedUser, 
  Credentials, 
  RefreshTokenRequest } from '@vsp/clients/core';

import { CacheKeys } from '@vsp/admin/constants';
import { ResponseMessage } from '@vsp/clients/core';
import { REQUIRES_AUTHENTICATION } from '@vsp/admin/core/interceptors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private _environmentService: EnvironmentService,
    private _http: HttpClient,
    @Inject(CACHE_SERVICE)
    public _cacheService: ICacheService
  ) { }

  public signInUser(credentials: Credentials): Observable<AuthenticatedUser> {
    return this._http.post<AuthenticatedUser>(
      `${this._environmentService.getBaseAuthUrl()}/sign-in`, 
      credentials,
      { context: new HttpContext().set(REQUIRES_AUTHENTICATION, false) }
    );
  }

  public refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<AuthenticatedUser> {
    return this._http.post<AuthenticatedUser>(
      `${this._environmentService.getBaseAuthUrl()}/refresh-access-token`,
      refreshTokenRequest,
      { context: new HttpContext().set(REQUIRES_AUTHENTICATION, false) }
    );
  }

  public getCachedAuthenticatedUser(): AuthenticatedUser | null {
    return this._cacheService.getItem(CacheKeys.AUTHENTICATED_USER);
  }

  public cacheAuthenticatedUser(user: AuthenticatedUser): void {
    this._cacheService.setItem(CacheKeys.AUTHENTICATED_USER, user);
  }

  public removeCachedAuthenticatedUser(): void {
    this._cacheService.removeItem(CacheKeys.AUTHENTICATED_USER);
  }
}
