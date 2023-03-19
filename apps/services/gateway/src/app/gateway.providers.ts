import { ClientProxyFactory, TcpClientOptions, Transport } from '@nestjs/microservices';

import { CUSTOMERS_SERVICE_TOKEN, IDENTITY_SERVICE_TOKEN, PAYMENTS_SERVICE_TOKEN } from '@vsp/services/common';
import { EnvironmentService } from '@vsp/services/core';

export const identityMicroserviceProvider = {
  provide: IDENTITY_SERVICE_TOKEN,
  useFactory: (environmentService: EnvironmentService) => {
    return ClientProxyFactory.create({
      options: {
        port: environmentService.get('IDENTITY_SERVICE_PORT'),
        host: environmentService.get('IDENTITY_SERVICE_HOST'),
      },
      transport: Transport.TCP,
    } as TcpClientOptions);
  },
  inject: [EnvironmentService]
};

export const paymentsMicroserviceProvider = {
  provide: PAYMENTS_SERVICE_TOKEN,
  useFactory: (environmentService: EnvironmentService) => {
    return ClientProxyFactory.create({
      options: {
        port: environmentService.get('PAYMENTS_SERVICE_PORT'),
        host: environmentService.get('PAYMENTS_SERVICE_HOST'),
      },
      transport: Transport.TCP,
    } as TcpClientOptions);
  },
  inject: [EnvironmentService]
};

export const customersMicroserviceProvider = {
  provide: CUSTOMERS_SERVICE_TOKEN,
  useFactory: (environmentService: EnvironmentService) => {
    return ClientProxyFactory.create({
      options: {
        port: environmentService.get('CUSTOMERS_SERVICE_PORT'),
        host: environmentService.get('CUSTOMERS_SERVICE_HOST'),
      },
      transport: Transport.TCP,
    } as TcpClientOptions);
  },
  inject: [EnvironmentService]
};
