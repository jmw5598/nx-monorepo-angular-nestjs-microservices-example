import { makeEnvironmentProviders } from '@angular/core';

import { EnvironmentSettings, VSP_CORE_CONFIGURATION } from './vsp-core-configuration.model';

import { EnvironmentService } from './services/environment.service';
import { CACHE_SERVICE } from './services/cache-service.interface';
import { SessionCacheService } from './services/session-cache.service';

export const provideVspCoreProviders = (environment: EnvironmentSettings) => makeEnvironmentProviders([
  EnvironmentService,
  {
    provide: VSP_CORE_CONFIGURATION,
    useValue: environment
  },
  {
    provide: CACHE_SERVICE,
    useClass: SessionCacheService
  }
]);
