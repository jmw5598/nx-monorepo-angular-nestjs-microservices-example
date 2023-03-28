import { Routes } from '@angular/router';

export const authenticationRoutes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => 
      import('./pages/sign-in/sign-in.component').then(c => c.SignInComponent)
  },
  {
    path: 'signing-in',
    loadComponent: () => 
      import('./pages/signing-in/signing-in.component').then(c => c.SigningInComponent)
  },
  {
    path: 'signing-out',
    loadComponent: () => 
      import('./pages/signing-out/signing-out.component').then(c => c.SigningOutComponent) 
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];
