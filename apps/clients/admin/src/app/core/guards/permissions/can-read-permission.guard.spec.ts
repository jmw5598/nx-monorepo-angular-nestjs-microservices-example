import { TestBed } from '@angular/core/testing';

import { CanReadPermissionGuard } from './can-read-permission.guard';

describe('CanReadPermissionGuard', () => {
  let guard: CanReadPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanReadPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
