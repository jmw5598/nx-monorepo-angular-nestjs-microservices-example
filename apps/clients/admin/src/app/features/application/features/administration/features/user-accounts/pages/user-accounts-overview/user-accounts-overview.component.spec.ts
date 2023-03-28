import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountsOverviewComponent } from './user-accounts-overview.component';

describe('UserAccountsOverviewComponent', () => {
  let component: UserAccountsOverviewComponent;
  let fixture: ComponentFixture<UserAccountsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
