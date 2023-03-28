import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ModulePermission, ResponseMessage } from '@vsp/clients/core';

export const PermissionsActions = createActionGroup({
  source: 'Security Permissions',
  events: {
    'Get Assignable Module Permissions Request': emptyProps(),
    'Get Assignable Module Permissions Request Success': props<{ permissions: ModulePermission[] }>(),
    'Get Assignable Module Permissions Request Failure': props<{ message: ResponseMessage }>()
  }
});
