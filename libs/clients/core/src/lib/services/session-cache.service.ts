import { inject, Inject, Injectable } from '@angular/core';
import { ICacheService } from './cache-service.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionCacheService implements ICacheService {
  private readonly _window: Window = inject(Window);

  public setItem<T>(key: string, t: T): void {
    this._window.sessionStorage.setItem(key, JSON.stringify(t));
  }

  public getItem<T>(key: string): T | null {
    const value = this._window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  }

  public removeItem<T>(key: string): void {
    this._window.sessionStorage.removeItem(key);
  }

  public clear(): void {
    this._window.sessionStorage.clear();
  }
}
