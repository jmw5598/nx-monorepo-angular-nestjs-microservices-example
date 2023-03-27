import { ResponseStatus } from './response-status.enum';

export interface ResponseMessage {
  status: ResponseStatus,
  message: string
}
