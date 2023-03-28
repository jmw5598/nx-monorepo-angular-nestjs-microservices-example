import { TestBed } from '@angular/core/testing';

import { InitialUserAccountsSearchLoadedGuard } from './initial-user-accounts-search-loaded.guard';

describe('InitialUserAccountsSearchLoadedGuard', () => {
  let guard: InitialUserAccountsSearchLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InitialUserAccountsSearchLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
