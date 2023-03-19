import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

import { PAYMENTS_SERVICE_TOKEN, findAllPaymentsCommand } from '@vsp/services/common';
import { LoggerService } from '@vsp/services/logger';
import { JwtAuthGuard } from '@vsp/services/authorization';

@Controller('payments')
export class PaymentsController {
  @Inject(PAYMENTS_SERVICE_TOKEN)
  private readonly _paymentsServiceClient: ClientProxy;
  
  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(PaymentsController.name);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public findAllPayments(): Observable<any[]> {
    return this._paymentsServiceClient
      .send(findAllPaymentsCommand, {})
      .pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }
}
