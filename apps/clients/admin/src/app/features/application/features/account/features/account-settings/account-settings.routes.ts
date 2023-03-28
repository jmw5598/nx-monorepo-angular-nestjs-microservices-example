import { Routes } from '@angular/router'; 

export const accountSettingsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/account-settings/account-settings.component')
        .then(c => c.AccountSettingsComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
