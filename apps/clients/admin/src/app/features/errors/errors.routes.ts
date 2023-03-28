import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { ErrorPermissionDeniedComponent } from './pages/error-permission-denied/error-permission-denied.component';
import { ErrorUnauthorizedComponent } from './pages/error-unauthorized/error-unauthorized.component';

export const errorsRoutes: Routes = [
  {
    path: '401',
    loadComponent: () => 
      import('./pages/error-unauthorized/error-unauthorized.component').then(c => c.ErrorUnauthorizedComponent)
  },
  {
    path: '403',
    loadComponent: () => 
      import('./pages/error-permission-denied/error-permission-denied.component').then(c => c.ErrorPermissionDeniedComponent)
  },
  {
    path: '404',
    loadChildren: () => 
      import('./pages/error-not-found/error-not-found.component').then(c => c.ErrorNotFoundComponent)
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];
