import { Observable } from 'rxjs';
import { Page } from '../models/paging/page.model';
import { PageRequest } from '../models/paging/page-request.model';

export interface CrudOperations<T, ID> {
  save(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  findOne(id: ID): Observable<T>;
  findAll(): Observable<T[]>;
  findByPage(pageRequest?: PageRequest): Observable<Page<T>>;
  delete(id: ID): Observable<any>;
}
