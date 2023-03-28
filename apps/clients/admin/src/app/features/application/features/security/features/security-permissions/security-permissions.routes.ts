import { Routes } from '@angular/router';

import { AssignablePermissionsLoadedGuard } from '@vsp/admin/core/guards';

import { InitialTemplateModulePermissionNamesSearchLoadedGuard } from './guards/initial-template-module-permission-names-search-loaded.guard';
import { SelectedTemplateModulePermissionNameLoadedGuard } from './guards/selected-template-module-permission-name-loaded.guard';

export const securityPermissionsRoutes: Routes = [
  {
    path: '',
    canActivate: [InitialTemplateModulePermissionNamesSearchLoadedGuard],
    loadComponent: () => 
      import('./pages/security-permissions/security-permissions.component')
        .then(c => c.SecurityPermissionsComponent)
  },
  {
    path: 'create',
    canActivate: [AssignablePermissionsLoadedGuard],
    loadComponent: () => 
      import('./pages/security-permissions-create/security-permissions-create.component')
        .then(c => c.SecurityPermissionsCreateComponent)
  },
  {
    path: ':templateModulePermissionNameId',
    canActivate: [SelectedTemplateModulePermissionNameLoadedGuard],
    children: [
      {
        path: 'edit',
        canActivate: [AssignablePermissionsLoadedGuard],
        loadComponent: () => 
          import('./pages/security-permissions-update/security-permissions-update.component')
            .then(c => c.SecurityPermissionsUpdateComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
