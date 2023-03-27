import { inject, Injectable } from '@angular/core';

import { EnvironmentSettings, VSP_CORE_CONFIGURATION } from '../vsp-core-configuration.model';

@Injectable()
export class EnvironmentService {
  private readonly _env: EnvironmentSettings = inject(VSP_CORE_CONFIGURATION)

  public getEnvironmentSettings(): EnvironmentSettings {
    return this._env;
  }

  public getSection(section: string): any {
    return {...this._env}[section];
  }

  public getBaseUrl(): string {
    const port: string = this._env.api.port?.length ? `:${this._env.api.port}` : ''; 
    return `${this._env.api.protocol}://${this._env.api.domain}${port}`;
  }

  public getBaseApiUrl(): string {
    const port: string = this._env.api.port?.length ? `:${this._env.api.port}` : ''; 
    return `${this._env.api.protocol}://${this._env.api.domain}${port}/${this._env.api.apiSlug}`;
  }

  public getBaseAuthUrl(): string {
    const port: string = this._env.api.port?.length ? `:${this._env.api.port}` : ''; 
    return `${this._env.api.protocol}://${this._env.api.domain}${port}/${this._env.api.authSlug}`;
  }
}
