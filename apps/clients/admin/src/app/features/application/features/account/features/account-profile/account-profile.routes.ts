import { Routes } from '@angular/router'; 

export const accountProfileRoutes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/account-profile/account-profile.component')
        .then(c => c.AccountProfileComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
