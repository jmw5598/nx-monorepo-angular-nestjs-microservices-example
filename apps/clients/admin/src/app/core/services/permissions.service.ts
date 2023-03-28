import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { 
  EnvironmentService, 
  Page, 
  PageRequest, 
  TemplateModulePermissionName, 
  ModulePermission } from '@vsp/clients/core';

import { BasicQuerySearchFilter } from '@vsp/query-search-filters';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private readonly _endpointSlug: string = 'security/permissions';
  private readonly _environmentService: EnvironmentService = inject(EnvironmentService);
  private readonly _http: HttpClient = inject(HttpClient);

  public createTemplateModulePermissionName(
    templateModulePermissionName: TemplateModulePermissionName): Observable<TemplateModulePermissionName> {

      return this._http.post<TemplateModulePermissionName>(
        `${this._environmentService.getBaseApiUrl()}/${this._endpointSlug}/templates`,
        templateModulePermissionName
      );
  }

  public updateTemplateModulePermissionName(
    templateModulePermissionNameId: string, 
    templateModulePermissionName: TemplateModulePermissionName): Observable<TemplateModulePermissionName> {

      return this._http.put<TemplateModulePermissionName>(
        `${this._environmentService.getBaseApiUrl()}/${this._endpointSlug}/templates/${templateModulePermissionNameId}`,
        templateModulePermissionName
      );
  }

  public searchTemplateModulePermissionNames(
    filter: BasicQuerySearchFilter, 
    pageRequest: PageRequest): Observable<Page<TemplateModulePermissionName>> {
      const queryParams: {[key: string]: string } = { 
        query: filter?.query || '',
        isDeleted: ''+(filter?.isDeleted ?? ''),
        size: pageRequest.size.toString(),
        index: pageRequest.index.toString(),
        column: pageRequest?.sort?.column?.toString() || '',
        direction: pageRequest?.sort?.direction?.toString() || ''
      };
      return this._http.get<Page<TemplateModulePermissionName>>(
        `${this._environmentService.getBaseApiUrl()}/${this._endpointSlug}/templates/search`,
        { params: queryParams }
      );
  }

  public getAssignableModulePermission(): Observable<ModulePermission[]> {
    return this._http.get<ModulePermission[]>(
      `${this._environmentService.getBaseApiUrl()}/${this._endpointSlug}/available`
    );
  }

  public getTemplateModulePermissionNames(): Observable<TemplateModulePermissionName[]> {
    return this._http.get<TemplateModulePermissionName[]>(
      `${this._environmentService.getBaseApiUrl()}/${this._endpointSlug}/templates`
    );
  }

  public getTemplateModulePermissionNameById(templateModulePermissionNameId: string): Observable<TemplateModulePermissionName> {
    return this._http.get<TemplateModulePermissionName>(
      `${this._environmentService.getBaseApiUrl()}/${this._endpointSlug}/templates/${templateModulePermissionNameId}`
    );
  }

  public deleteTemplateModulePermissionNameById(templateModulePermissionNameId: string): Observable<TemplateModulePermissionName> {
    return this._http.delete<TemplateModulePermissionName>(
      `${this._environmentService.getBaseApiUrl()}/${this._endpointSlug}/templates/${templateModulePermissionNameId}`
    );
  }

  public restoreTemplateModulePermissionNameById(templateModulePermissionNameId: string): Observable<TemplateModulePermissionName> {
    return this._http.patch<TemplateModulePermissionName>(
      `${this._environmentService.getBaseApiUrl()}/${this._endpointSlug}/templates/${templateModulePermissionNameId}/restore`, {}
    );
  }
}
