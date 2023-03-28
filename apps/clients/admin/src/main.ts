import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideVspCoreProviders } from '@vsp/clients/core';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routing';
import { nzGlobalIcons, provideCoreProviders } from './app/core/core.providers';
import { environment } from './environments/environment';
import { rootEffects, ROOT_REDUCERS, storeModuleRuntimeChecks, metaReducers } from './app/store';
import { NzIconModule } from 'ng-zorro-antd/icon';

bootstrapApplication(
  AppComponent, {
    providers: [
      provideRouter(appRoutes),
      provideHttpClient(withInterceptorsFromDi()),
      importProvidersFrom([
        BrowserAnimationsModule, 
        NzIconModule.forRoot(nzGlobalIcons)
      ]),
      provideStore(ROOT_REDUCERS, { metaReducers, runtimeChecks: storeModuleRuntimeChecks }),
      provideEffects(rootEffects),
      provideStoreDevtools({ name: 'Vso Project Store', logOnly: environment.production }),
      provideVspCoreProviders(environment),
      provideCoreProviders(),
    ]
  }
).catch(err => console.error(err));