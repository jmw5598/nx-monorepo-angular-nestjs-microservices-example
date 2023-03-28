import { TestBed } from '@angular/core/testing';

import { CanCreatePermissionGuard } from './can-create-permission.guard';

describe('CanCreatePermissionGuard', () => {
  let guard: CanCreatePermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanCreatePermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
