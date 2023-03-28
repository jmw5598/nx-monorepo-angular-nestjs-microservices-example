import { TestBed } from '@angular/core/testing';

import { NavigationMenuService } from './navigation-menu.service';

describe('NavigationMenuService', () => {
  let service: NavigationMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
