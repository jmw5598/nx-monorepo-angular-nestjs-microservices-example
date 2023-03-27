import { PageRequest } from './page-request.model';
import { SortDirection } from './sort-direction.enum';
import { Sort } from './sort.model';

export class PagingUtils {
  public static from(index: number, size: number, sortColumn: string, sortDirection: string | SortDirection): PageRequest {
    const sort: Sort = {
      column: sortColumn, 
      direction: sortDirection.toLocaleLowerCase().trim() === 'ascend' ? SortDirection.Ascend : SortDirection.Descend
    };
    return { index, size, sort } as PageRequest;
  }
}
