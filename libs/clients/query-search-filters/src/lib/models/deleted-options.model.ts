export interface DeletedOptions {
  all: DeletedOption,
  active: DeletedOption,
  inactive: DeletedOption 
}

export interface DeletedOption {
  label: string,
  value: boolean | null
}
