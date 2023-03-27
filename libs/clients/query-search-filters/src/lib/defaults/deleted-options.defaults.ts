import { DeletedOption, DeletedOptions } from '../models/deleted-options.model';

export const defaultDeletedOptions: DeletedOptions = {
  all:      { label: 'All',      value: null  } as DeletedOption,
  active:   { label: 'Active',   value: false } as DeletedOption,
  inactive: { label: 'Inactive', value: true  } as DeletedOption,
} as DeletedOptions;
