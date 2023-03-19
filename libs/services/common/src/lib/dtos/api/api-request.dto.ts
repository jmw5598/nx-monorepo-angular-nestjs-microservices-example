export class ApiRequest<T> {
  public payload: T | null | undefined

  constructor(args: any) {
    Object.assign(this, { ...args });
  }
}
