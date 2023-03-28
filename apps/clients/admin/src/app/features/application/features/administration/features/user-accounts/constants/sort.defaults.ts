import { Sort, SortDirection } from '@vsp/clients/core';

export const defaultUserAccountsSort: Sort = {
  column: 'userName',
  direction: SortDirection.Ascend
} as Sort;
