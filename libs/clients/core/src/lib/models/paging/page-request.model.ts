import { SortDirection } from './sort-direction.enum';
import { Sort } from './sort.model';

export interface PageRequest {
  index: number,
  size: number,
  sort: Sort,
}
