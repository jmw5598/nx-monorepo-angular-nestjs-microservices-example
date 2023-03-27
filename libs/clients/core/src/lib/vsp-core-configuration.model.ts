import { InjectionToken } from '@angular/core';

export const VSP_CORE_CONFIGURATION: InjectionToken<EnvironmentSettings> = new InjectionToken<EnvironmentSettings>('VSP_CORE_CONFIGURATION');

export interface EnvironmentSettings {
  production: boolean,
  api: ApiSettings,
  liveChatWebSocket: WebSocketSettings,
  recaptcha: RecaptchaSettings,
}

export interface RecaptchaSettings {
  siteKey: string,
}

export interface ApiSettings {
  protocol: string,
  subdomain: string,
  domain: string,
  port: string,
  apiSlug: string,
  authSlug: string
}

export interface WebSocketSettings {
  protocol: string,
  subdomain: string,
  domain: string,
  port: string,
  websocketSlug: string,
  hubEndpoint: string,
}
