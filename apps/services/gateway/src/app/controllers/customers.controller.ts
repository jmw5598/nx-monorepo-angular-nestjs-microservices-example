import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

import { CUSTOMERS_SERVICE_TOKEN, findAllCustomersCommand } from '@vsp/services/common';
import { LoggerService } from '@vsp/services/logger';
import { JwtAuthGuard } from '@vsp/services/authorization';

@Controller('customers')
export class CustomersController {
  @Inject(CUSTOMERS_SERVICE_TOKEN)
  private readonly _customersServiceClient: ClientProxy;
  
  constructor(private readonly _logger: LoggerService) {
    this._logger.setContext(CustomersController.name);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public findAllCustomers(): Observable<any[]> {
    return this._customersServiceClient
      .send(findAllCustomersCommand, {})
      .pipe(catchError(error => throwError(() => new RpcException(error.response))));
  }
}
