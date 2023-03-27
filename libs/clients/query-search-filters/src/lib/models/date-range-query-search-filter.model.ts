import { BasicQuerySearchFilter } from './basic-query-search-filter.model';

export interface DateRangeQuerySearchFilter extends BasicQuerySearchFilter {
  startDate: string | null,
  endDate: string | null
}
