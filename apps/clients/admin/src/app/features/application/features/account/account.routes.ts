import { Routes } from '@angular/router'; 

export const accountRoutes: Routes = [
  {
    path: 'profile',
    loadChildren: () => 
      import('./features/account-profile/account-profile.routes')
        .then(r => r.accountProfileRoutes)
  },
  {
    path: 'settings',
    loadChildren: () => 
      import('./features/account-settings/account-settings.routes')
        .then(c => c.accountSettingsRoutes)
  },
  {
    path: '**',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];
