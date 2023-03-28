import { TestBed } from '@angular/core/testing';

import { UserPermissionsByUserIdLoadedGuard } from './user-permissions-by-user-id-loaded.guard';

describe('UserPermissionsByUserIdLoadedGuard', () => {
  let guard: UserPermissionsByUserIdLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPermissionsByUserIdLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
