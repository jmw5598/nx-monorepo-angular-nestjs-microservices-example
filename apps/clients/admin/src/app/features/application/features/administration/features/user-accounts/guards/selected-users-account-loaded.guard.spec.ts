import { TestBed } from '@angular/core/testing';

import { SelectedUsersAccountLoadedGuard } from './selected-users-account-loaded.guard';

describe('SelectedUsersAccountLoadedGuard', () => {
  let guard: SelectedUsersAccountLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectedUsersAccountLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
