import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { AuthenticationActions, AuthenticationSelectors, AuthenticationState } from '@vsp/admin/features/identity/features/authentication/store';
import { AuthenticationService } from '@vsp/admin/features/identity/features/authentication/services/authentication.service';
import { AuthenticatedUser } from '@vsp/clients/core';


export function authenticatedUserInitializer(
    store: Store<AuthenticationState>, 
    authenticationSerivce: AuthenticationService) {
  
  const user: AuthenticatedUser | null = authenticationSerivce.getCachedAuthenticatedUser();

  return () => new Promise<boolean>(resolve => {
    if (user) {
      store.dispatch(AuthenticationActions.setAuthenticatedUser({ authenticatedUser: user }));
    } else {
      store.dispatch(AuthenticationActions.setAuthenticatedUser({ authenticatedUser: null }))
    }
    store.select(AuthenticationSelectors.selectAuthenticatedUser)
      .pipe(take(1))
      .subscribe(user => resolve(true))    
  });
};
