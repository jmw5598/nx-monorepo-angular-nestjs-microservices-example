import { DynamicModule, Module } from '@nestjs/common';

import { EnvironmentService } from './services/environment.service';
import { TypeOrmConfigService } from './services/type-orm-config.service';

@Module({
  providers: [],
  exports: [],
})
export class CoreModule {
  public static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      providers: [
        EnvironmentService,
        TypeOrmConfigService
      ],
      exports: [
        EnvironmentService,
        TypeOrmConfigService
      ]
    } as DynamicModule
  }
}
