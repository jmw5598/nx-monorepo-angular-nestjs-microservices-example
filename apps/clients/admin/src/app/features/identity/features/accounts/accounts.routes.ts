import { Routes } from '@angular/router';

export const accountsRoutes: Routes = [
  {
    path: 'register',
    loadComponent: () => 
      import('./pages/register/register.component').then(c => c.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => 
      import('./pages/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent) 
  },
  {
    path: 'reset-password',
    loadComponent: () => 
      import('./pages/reset-password/reset-password.component').then(c => c.ResetPasswordComponent) 
  },
  {
    path: '**',
    redirectTo: 'register',
    pathMatch: 'full'
  }
];
