import { TestBed } from '@angular/core/testing';

import { SessionCacheService } from './session-cache.service';

describe('SessionCacheService', () => {
  let service: SessionCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
