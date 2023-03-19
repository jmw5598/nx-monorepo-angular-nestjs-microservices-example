import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const internalServiceErrorPayload = {
      error: 'Internal Server Error',
      message: 'There was a problem on the server!',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    }

    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    response
      .status(error?.statusCode || internalServiceErrorPayload.statusCode)
      .json(error || internalServiceErrorPayload);
  }
}
