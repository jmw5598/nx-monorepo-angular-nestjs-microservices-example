export interface BaseEntity {
  id: string,
  createdOn: Date,
  createdBy: any,
  updatedOn: Date,
  updatedBy: any
  deletedOn?: any,
}
