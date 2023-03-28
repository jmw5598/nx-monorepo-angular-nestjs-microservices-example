import { Routes } from '@angular/router';

import { ModulePermissionNames } from '@vsp/clients/core';
import { HasModulePermissionGuard } from '@vsp/admin/core/guards';

export const applicationRoutes: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/application/application.component').then(c => c.ApplicationComponent),
    children: [
      {
        path: 'admin',
        loadChildren: () => 
          import('./features/administration/administration.routes').then(r => r.administrationRoutes)
      },
      {
        path: 'dashboard',
        loadChildren: () => 
          import('./features/dashboard/dashboard.routes').then(r => r.dashboardRoutes)
      },
      {
        path: 'security',
        loadChildren: () => 
          import('./features/security/security.routes').then(r => r.securityRoutes)
      },
      {
        path: 'account',
        loadChildren: () => 
          import('./features/account/account.routes').then(r => r.accountRoutes)
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
