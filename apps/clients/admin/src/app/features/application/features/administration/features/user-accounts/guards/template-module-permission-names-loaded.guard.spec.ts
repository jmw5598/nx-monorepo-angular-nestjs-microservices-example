import { TestBed } from '@angular/core/testing';

import { TemplateModulePermissionNamesLoadedGuard } from './template-module-permission-names-loaded.guard';

describe('TemplateModulePermissionNamesLoadedGuard', () => {
  let guard: TemplateModulePermissionNamesLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TemplateModulePermissionNamesLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
