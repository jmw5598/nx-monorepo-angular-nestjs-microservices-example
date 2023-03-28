import { Routes } from '@angular/router';

import { AuthenticatedGuard } from '@vsp/admin/features/identity/features/authentication/guards';

import { 
  UserModulePermissionsLoadedGuard, 
  UserSettingsLoadedGuard } from '@vsp/admin/core/guards';

export const appRoutes: Routes = [
  {
    path: 'app',
    canActivate: [
      AuthenticatedGuard,
      // UserSettingsLoadedGuard,
      // UserModulePermissionsLoadedGuard,
    ],
    loadChildren: () => 
        import('./features/application/application.routes').then(r => r.applicationRoutes)
  },
  {
    path: 'error',
    loadChildren: () => 
      import('./features/errors/errors.routes').then(c => c.errorsRoutes)
  },
  {
    path: '',
    loadChildren: () => 
      import('./features/identity/identity.routes').then(r => r.identityRoutes)
  },
  {
    path: '**',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];
