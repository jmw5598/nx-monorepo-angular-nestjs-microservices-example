export class ApiResponse<T> {
  public statusCode: number;
  public message: string;
  public error?: string | null | undefined;
  public payload?: T | null | undefined;

  constructor(args: any) {
    Object.assign(this, { ...args });
  }
}