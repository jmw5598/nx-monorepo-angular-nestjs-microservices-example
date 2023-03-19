import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { EnvironmentService } from './environment.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly _environmentService: EnvironmentService
  ) { }
  
  public createTypeOrmOptions(connectionName?: string | undefined): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: this._environmentService.get('TYPEORM_CONNECTION'),
      host: this._environmentService.get('TYPEORM_HOST'),
      port: this._environmentService.get('TYPEORM_PORT'),
      username: this._environmentService.get('TYPEORM_USER'),
      password: this._environmentService.get('TYPEORM_PASSWORD'),
      database: this._environmentService.get('TYPEORM_DATABASE'),
      synchronize: this._environmentService.get('TYPEORM_SYNCRONIZE'),
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy()
    } as TypeOrmModuleOptions;
  }
}
