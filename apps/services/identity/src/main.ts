import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';

import { EnvironmentService } from '@vsp/services/core';

import { IdentityModule } from './app/identity.module';

async function bootstrap() {
  const environmentService: EnvironmentService = new EnvironmentService();
  const app = await NestFactory.createMicroservice(
    IdentityModule, {
      transport: Transport.TCP,
      options: {
        host: environmentService.get('IDENTITY_SERVICE_HOST') || 'localhost',
        port: environmentService.get('IDENTITY_SERVICE_PORT') || 3001
      }
    } as TcpOptions
  );
  await app.listen();
}
bootstrap();

