import { ColumnType } from './column-type.enum';

export interface ColumnDefinitionOptions {
  truncateLength?: number
}

export interface ColumnDefinition {
  label: string,
  property: string,
  type: ColumnType,
  isVisible: boolean,
  canModify: boolean,
  sortable?: boolean | null,
  align?: string,
  width?: string | null,
  options?: ColumnDefinitionOptions | null
}
