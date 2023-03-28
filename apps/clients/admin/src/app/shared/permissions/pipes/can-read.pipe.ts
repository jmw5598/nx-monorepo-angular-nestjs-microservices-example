import { Pipe, PipeTransform } from '@angular/core';

import { PermissionNames, UserModulesAndPermissionsMap } from '@vsp/clients/core';

@Pipe({
  name: 'vspCanRead',
  standalone: true,
})
export class VspCanReadPipe implements PipeTransform {
  public transform(
    userModulePermissionsMap: UserModulesAndPermissionsMap | null,
    permissionName: PermissionNames | null | undefined
  ): boolean {
    return userModulePermissionsMap && permissionName && userModulePermissionsMap?.permissions.hasOwnProperty(permissionName)
      ? userModulePermissionsMap?.permissions[permissionName]?.canRead || false
      : false;
  }
}
