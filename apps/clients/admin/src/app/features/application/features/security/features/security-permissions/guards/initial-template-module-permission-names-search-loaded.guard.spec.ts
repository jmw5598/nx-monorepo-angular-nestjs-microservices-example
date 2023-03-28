import { TestBed } from '@angular/core/testing';

import { InitialTemplateModulePermissionNamesSearchLoadedGuard } from './initial-template-module-permission-names-search-loaded.guard';

describe('InitialTemplateModulePermissionNamesSearchLoadedGuard', () => {
  let guard: InitialTemplateModulePermissionNamesSearchLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InitialTemplateModulePermissionNamesSearchLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
