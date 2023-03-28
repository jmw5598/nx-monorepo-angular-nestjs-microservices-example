import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';

import { 
  ArrowLeftOutline,
  ArrowRightOutline,
  DashboardOutline,
  FolderViewOutline,
  IdcardOutline, 
  MailOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  LockOutline,
  PoweroffOutline,
  SettingOutline,
  TeamOutline,
  UnlockOutline, 
  UserOutline } from '@ant-design/icons-angular/icons';

import { CACHE_SERVICE, SessionCacheService } from '@vsp/clients/core';

import { authenticatedUserInitializer } from './initializers/authenticated-user.initializer';
import { JwtTokenInterceptor } from './interceptors';
import { AuthenticationService } from '@vsp/admin/features/identity/features/authentication/services/authentication.service';

export const jwtTokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtTokenInterceptor,
  multi: true
}

export const windowProvider = {
  provide: Window,
  useValue: window
}

export const cacheProvider = {
  provide: CACHE_SERVICE,
  useExisting: SessionCacheService
}

const authenticationUserAppInitializer = { 
  provide: APP_INITIALIZER, 
  useFactory: authenticatedUserInitializer, 
  multi: true,
  deps: [Store, AuthenticationService]
}

export const nzI18NProvider = { 
  provide: NZ_I18N, 
  useValue: en_US
}

export const nzGlobalIcons: IconDefinition[] = [
  ArrowLeftOutline,
  ArrowRightOutline,
  DashboardOutline,
  FolderViewOutline,
  IdcardOutline, 
  MailOutline, 
  MenuFoldOutline,
  MenuUnfoldOutline,
  LockOutline,
  PoweroffOutline,
  SettingOutline,
  TeamOutline, 
  UnlockOutline,
  UserOutline
]; 

export const provideCoreProviders = () => makeEnvironmentProviders([
  authenticationUserAppInitializer,
  jwtTokenInterceptorProvider,
  windowProvider,
  cacheProvider,
  nzI18NProvider
]);
