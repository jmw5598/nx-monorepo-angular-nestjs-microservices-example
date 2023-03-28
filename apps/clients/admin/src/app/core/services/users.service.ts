import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EnvironmentService, Page, PageRequest, ValidationResult } from '@vsp/clients/core';

import { BasicQuerySearchFilter } from '@vsp/query-search-filters';
import { UserPermission, UserAccountDto, UserAccount, UserModulePermissions, UserSettings } from '@vsp/clients/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly environmentService: EnvironmentService = inject(EnvironmentService);
  private readonly http: HttpClient = inject(HttpClient);

  public verifyEmail(email: string): Observable<ValidationResult> {
    return this.http.get<ValidationResult>(
      `${this.environmentService.getBaseApiUrl()}/users/verify/email`,
      { params: { email: email } }
    )
  }

  public verifyUserName(userName: string): Observable<ValidationResult> {
    return this.http.get<ValidationResult>(
      `${this.environmentService.getBaseApiUrl()}/users/verify/username`,
      { params: { userName: userName } }
    );
  }

  public searchUsers(filter: BasicQuerySearchFilter, pageRequest: PageRequest): Observable<Page<UserAccountDto>> {
    const queryParams: {[key: string]: string } = { 
      query: filter?.query || '',
      size: pageRequest.size.toString(),
      index: pageRequest.index.toString(),
      column: pageRequest?.sort?.column?.toString() || '',
      direction: pageRequest?.sort?.direction?.toString() || ''
    };
    return this.http.get<Page<UserAccountDto>>(
      `${this.environmentService.getBaseApiUrl()}/users/search`,
      { params: queryParams }
    );
  }

  public createUserAccount(userAccount: UserAccount): Observable<UserAccountDto> {
    return this.http.post<UserAccountDto>(
      `${this.environmentService.getBaseApiUrl()}/users`,
      userAccount
    );
  }

  public updateUserAccount(userId: string, userAccount: UserAccount): Observable<UserAccountDto> {
    return this.http.put<UserAccountDto>(
      `${this.environmentService.getBaseApiUrl()}/users/${userId}`,
      userAccount
    );
  }

  public getUserByUserId(userId: string): Observable<UserAccountDto> {
    return this.http.get<UserAccountDto>(
      `${this.environmentService.getBaseApiUrl()}/users/${userId}`
    );
  }

  public getUserPermissionsByUserId(userId: string): Observable<UserPermission[]> {
    return this.http.get<UserPermission[]>(
      `${this.environmentService.getBaseApiUrl()}/users/${userId}/permissions`
    );
  }

  public getUserSettings(): Observable<UserSettings> {
    return this.http.get<UserSettings>(
      `${this.environmentService.getBaseApiUrl()}/users/settings`
    );
  }

  public getUserPermissions(): Observable<UserModulePermissions> {
    return this.http.get<UserModulePermissions>(
      `${this.environmentService.getBaseApiUrl()}/users/permissions`
    );
  }
}
