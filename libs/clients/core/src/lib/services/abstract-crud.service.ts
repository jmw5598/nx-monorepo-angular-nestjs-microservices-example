import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';
import { Page } from '../models/paging/page.model';
import { PageRequest } from '../models/paging/page-request.model';
import { EnvironmentService } from './environment.service';

export abstract class AbstractCrudService<T, ID> implements CrudOperations<T, ID> {
  constructor(
    protected _http: HttpClient,
    protected _environmentService: EnvironmentService,
    protected _base: string
  ) {}

  public save(t: T): Observable<T> {
    return this._http.post<T>(
      `${this._environmentService.getBaseApiUrl()}/${this._base}`, t
    );
  }

  public update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(
      `${this._environmentService.getBaseApiUrl()}/${this._base}/${id}`, t, {}
    );
  }

  public findOne(id: ID): Observable<T> {
    return this._http.get<T>(
      `${this._environmentService.getBaseApiUrl()}/${this._base}/${id}`
    );
  }

  public findAll(): Observable<T[]> {
    return this._http.get<T[]>(
      `${this._environmentService.getBaseApiUrl()}/${this._base}`
    );
  }

  public findByPage(pageRequest?: PageRequest): Observable<Page<T>> {
    const params: {[key: string]: any} = !pageRequest ? {} : { 
      pageNumber: pageRequest.index,
      pageSize: pageRequest.size,
      sortCol: pageRequest.sort.column,
      sortDir: pageRequest.sort.direction
    };
    return this._http.get<Page<T>>(
      `${this._environmentService.getBaseApiUrl()}/${this._base}/search`, 
      { params: params });
  }

  public delete(id: ID): Observable<T> {
    return this._http.delete<T>(
      `${this._environmentService.getBaseApiUrl()}/${this._base}/${this._base}/${id}`
    );
  }
}
