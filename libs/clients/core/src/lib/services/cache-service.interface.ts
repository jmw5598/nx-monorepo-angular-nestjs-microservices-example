import { InjectionToken } from '@angular/core';

export const CACHE_SERVICE: InjectionToken<ICacheService> = new InjectionToken<ICacheService>('CACHE_SERVICE');

export interface ICacheService {
  setItem<T>(key: string, t: T): void;
  getItem<T>(key: string): T | null;
  removeItem<T>(key: string): void;
  clear(): void;
}
