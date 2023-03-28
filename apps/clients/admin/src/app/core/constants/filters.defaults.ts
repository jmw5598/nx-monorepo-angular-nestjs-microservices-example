import { BasicQuerySearchFilter, DateRangeQuerySearchFilter } from '@vsp/query-search-filters';

export const defaultBasicQuerySearchFilter: BasicQuerySearchFilter = {
  query: ''
} as BasicQuerySearchFilter;

export const defaultBasicQuerySearchWithDeletedFilter: BasicQuerySearchFilter = {
  query: '',
  isDeleted: false
} as BasicQuerySearchFilter;

export const defaultDateRangeQuerySearchFilter: DateRangeQuerySearchFilter = {
  query: '',
  startDate: null,
  endDate: null
} as DateRangeQuerySearchFilter;
