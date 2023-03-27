import { ColumnDefinition } from './column-definition.model';

export interface TableDefinition {
  title: string,
  columns: ColumnDefinition[]
}
