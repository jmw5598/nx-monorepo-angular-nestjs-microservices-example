import { TestBed } from '@angular/core/testing';

import { AssignablePermissionsLoadedGuard } from './assignable-permissions-loaded.guard';

describe('AssignablePermissionsLoadedGuard', () => {
  let guard: AssignablePermissionsLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssignablePermissionsLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
