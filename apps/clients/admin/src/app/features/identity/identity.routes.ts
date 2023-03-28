import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AccountsEffects, accountsFeature } from './features/accounts/store';

export const identityRoutes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/identity/identity.component').then(c => c.IdentityComponent),
    children: [
      {
        path: 'accounts',
        providers: [
          provideState(accountsFeature),
          provideEffects(AccountsEffects)
        ],
        loadChildren: () => 
          import('./features/accounts/accounts.routes').then(r => r.accountsRoutes)
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/authentication/authentication.routes').then(r => r.authenticationRoutes)
      },
      {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];
