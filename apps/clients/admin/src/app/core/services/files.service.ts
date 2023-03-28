import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from '@vsp/clients/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private readonly _baseEndpointSlug: string = 'files';
  private readonly _environmentService: EnvironmentService = inject(EnvironmentService);
  private readonly _http: HttpClient = inject(HttpClient);

  public uploadAvatar(file: object): Observable<object> {
    return this._http.post<object>(
      `${this._environmentService.getBaseApiUrl}/${this._baseEndpointSlug}/avatar`, 
      file
    );
  }
}
