import { QueryParamsHandling } from '@angular/router';

import { NavigationLink, ModulePermissionNames, PermissionNames } from '@vsp/clients/core';

export interface AdminNavigationLink extends NavigationLink {
  children?: AdminNavigationLink[],
  requiredModulePermissionName?: ModulePermissionNames | null,
  requiredPermissionName?: PermissionNames | null
}

export interface TabNavigationLink extends NavigationLink {
  queryParams?: {[key: string]: string},
  queryParamsHandling?: QueryParamsHandling | null | undefined
}
