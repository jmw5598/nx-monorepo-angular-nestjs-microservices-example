import { PageRequest, Sort, SortDirection } from '@vsp/clients/core';

export const defaultPageRequest: PageRequest = {
  index: 0,
  size: 10,
  sort: {
    column: 'id',
    direction: SortDirection.Descend
  } as Sort
} as PageRequest;
