import { TestBed } from '@angular/core/testing';

import { UserSettingsLoadedGuard } from './user-settings-loaded.guard';

describe('UserSettingsLoadedGuard', () => {
  let guard: UserSettingsLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserSettingsLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
