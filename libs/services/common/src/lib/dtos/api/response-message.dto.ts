import { ResponseStatus } from './response-status.enum';

export class ResponseMessage<T> {
  public status: ResponseStatus;
  public message: string;
  public payload?: T | null | undefined;

  constructor(args: any) {
    Object.assign(this, { ...args });
  }
}
