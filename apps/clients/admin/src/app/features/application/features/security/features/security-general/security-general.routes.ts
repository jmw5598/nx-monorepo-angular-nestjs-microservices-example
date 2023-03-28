import { Routes } from '@angular/router';

export const securityGeneralRoutes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/security-general/security-general.component')
        .then(c => c.SecurityGeneralComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
