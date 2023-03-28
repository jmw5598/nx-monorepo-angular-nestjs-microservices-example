import { TestBed } from '@angular/core/testing';

import { UserModulePermissionsLoadedGuard } from './user-module-permissions-loaded.guard';

describe('UserModulePermissionsLoadedGuard', () => {
  let guard: UserModulePermissionsLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserModulePermissionsLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
