import { TestBed } from '@angular/core/testing';

import { CanDeletePermissionGuard } from './can-delete-permission.guard';

describe('CanDeletePermissionGuard', () => {
  let guard: CanDeletePermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanDeletePermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
