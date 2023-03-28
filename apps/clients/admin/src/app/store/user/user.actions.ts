import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UserModulePermissions, UserSettings, ResponseMessage } from '@vsp/clients/core';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get User Settings Request': emptyProps(),
    'Get User Settings Request Success': props<{ settings: UserSettings }>(),
    'Get User Settings Request Failure': props<{ message: ResponseMessage }>(),
    'Get User Permissions Request': emptyProps(),
    'Get User Permissions Request Success': props<{ userModulePermissions: UserModulePermissions }>(),
    'Get User Permissions Request Failure': props<{ message: ResponseMessage }>()
  }
});
