import { TestBed } from '@angular/core/testing';

import { CanUpdatePermissionGuard } from './can-update-permission.guard';

describe('CanUpdatePermissionGuard', () => {
  let guard: CanUpdatePermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanUpdatePermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
