import { ColumnDefinition, ColumnType, TableDefinition } from '@vsp/clients/datatable';

export const defaultUserAccountsTableDefinition: TableDefinition = {
  title: 'User Accounts',
  columns: [
    {
      label: 'Profile',
      property: 'avatarUrl',
      type: ColumnType.IMAGE,
      isVisible: true,
      canModify: false,
      width: '75px'
    },
    {
      label: 'User Name',
      property: 'userName',
      type: ColumnType.TEXT,
      isVisible: true,
      canModify: false,
      width: '200px',
      sortable: true

    } as ColumnDefinition,
    {
      label: 'Email',
      property: 'email',
      type: ColumnType.EMAIL,
      isVisible: true,
      canModify: false,
      width: '200px',
      sortable: true
    } as ColumnDefinition,
    {
      label: 'First name',
      property: 'profile.firstName',
      type: ColumnType.TEXT,
      isVisible: true,
      canModify: true,
      width: '200px',
      sortable: true
    } as ColumnDefinition,
    {
      label: 'Last Name',
      property: 'profile.lastName',
      type: ColumnType.TEXT,
      isVisible: true,
      canModify: true,
      width: '200px',
      sortable: true
    } as ColumnDefinition,
  ]
} as TableDefinition;

export const getDefaultUserAccountsTableDefinition = (): TableDefinition => {
  return JSON.parse(JSON.stringify(defaultUserAccountsTableDefinition)) as TableDefinition
};