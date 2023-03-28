import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountsUpdateComponent } from './user-accounts-update.component';

describe('UserAccountsUpdateComponent', () => {
  let component: UserAccountsUpdateComponent;
  let fixture: ComponentFixture<UserAccountsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
