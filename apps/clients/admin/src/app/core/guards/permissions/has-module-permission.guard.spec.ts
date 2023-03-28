import { TestBed } from '@angular/core/testing';

import { HasModulePermissionGuard } from './has-module-permission.guard';

describe('HasModulePermissionGuard', () => {
  let guard: HasModulePermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasModulePermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
