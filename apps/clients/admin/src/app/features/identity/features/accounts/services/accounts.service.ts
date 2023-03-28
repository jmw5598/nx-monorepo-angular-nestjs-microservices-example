import { HttpClient, HttpContext } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { 
  ForgotPassword, 
  ResponseMessage, 
  CACHE_SERVICE, 
  EnvironmentService, 
  ICacheService,
  ResetPassword  } from '@vsp/clients/core';

import { REQUIRES_AUTHENTICATION } from '@vsp/admin/core/interceptors';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly _endpointSlug: string = 'accounts'
  constructor(
    private _environmentService: EnvironmentService,
    private _http: HttpClient,
    @Inject(CACHE_SERVICE)
    public _cacheService: ICacheService
  ) { }

  public forgotPassword(request: ForgotPassword): Observable<ResponseMessage> {
    return this._http.post<ResponseMessage>(
      `${this._environmentService.getBaseUrl()}/${this._endpointSlug}/forgot-password`,
      request,
      { context: new HttpContext().set(REQUIRES_AUTHENTICATION, false) }
    );
  }

  public resetPassword(request: ResetPassword): Observable<ResponseMessage> {
    return this._http.post<ResponseMessage>(
      `${this._environmentService.getBaseUrl()}/${this._endpointSlug}//reset-password`,
      request,
      { context: new HttpContext().set(REQUIRES_AUTHENTICATION, false) }
    );
  } 
}
