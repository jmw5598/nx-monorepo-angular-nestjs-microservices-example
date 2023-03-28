import { TestBed } from '@angular/core/testing';

import { HasPermissionGuard } from './has-permission.guard';

describe('HasPermissionGuard', () => {
  let guard: HasPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
