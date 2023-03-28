import { ColumnDefinition, ColumnType, TableDefinition } from '@vsp/clients/datatable';

export const defaultCasesTableDefinition: TableDefinition = {
  title: 'Offenders',
  columns: [
    {
      label: 'Profile',
      property: 'offender.avatarUrl',
      type: ColumnType.IMAGE,
      isVisible: true,
      canModify: false,
      width: '75px'
    },
    {
      label: 'Last Name',
      property: 'offender.lastName',
      type: ColumnType.TEXT,
      isVisible: true,
      canModify: false,
      width: '200px',
      sortable: true
    } as ColumnDefinition,
    {
      label: 'First Name',
      property: 'offender.firstName',
      type: ColumnType.TEXT,
      isVisible: true,
      canModify: false,
      width: '200px',
      sortable: true
    } as ColumnDefinition,
    {
      label: 'Status',
      property: 'status',
      type: ColumnType.TITLE,
      isVisible: true,
      canModify: false,
      width: '100px',
      sortable: true
    },
    {
      label: 'Summary',
      property: 'summary',
      type: ColumnType.TEXT_TRUNCATED,
      isVisible: true,
      canModify: false,
      width: undefined,
      sortable: false,
      options: {
        truncateLength: 200
      }
    },
    {
      label: 'Created On',
      property: 'createdOn',
      type: ColumnType.DATE,
      isVisible: true,
      canModify: true,
      width: '125px'
    } as ColumnDefinition,
    {
      label: 'Created By',
      property: 'createdBy.userName',
      type: ColumnType.TEXT,
      isVisible: true,
      canModify: false,
      width: '150px',
      sortable: false,
    } as ColumnDefinition,
    {
      label: 'Updated By',
      property: 'updatedBy.userName',
      type: ColumnType.TEXT,
      isVisible: true,
      canModify: false,
      width: '150px',
      sortable: false,
    } as ColumnDefinition,
    {
      label: 'Updated On',
      property: 'updatedOn',
      type: ColumnType.DATE,
      isVisible: true,
      canModify: true,
      width: '125px'
    } as ColumnDefinition,
  ]
} as TableDefinition;
