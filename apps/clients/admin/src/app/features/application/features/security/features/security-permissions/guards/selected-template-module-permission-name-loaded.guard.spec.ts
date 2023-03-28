import { TestBed } from '@angular/core/testing';

import { SelectedTemplateModulePermissionNameLoadedGuard } from './selected-template-module-permission-name-loaded.guard';

describe('SelectedTemplateModulePermissionNameLoadedGuard', () => {
  let guard: SelectedTemplateModulePermissionNameLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectedTemplateModulePermissionNameLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
