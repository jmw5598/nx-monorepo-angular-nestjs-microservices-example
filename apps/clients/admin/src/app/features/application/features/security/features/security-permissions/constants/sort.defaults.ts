import { Sort, SortDirection } from '@vsp/clients/core';

export const defaultSecurityPermissionsSort: Sort  = {
  column: 'name',
  direction: SortDirection.Ascend
} as Sort;
