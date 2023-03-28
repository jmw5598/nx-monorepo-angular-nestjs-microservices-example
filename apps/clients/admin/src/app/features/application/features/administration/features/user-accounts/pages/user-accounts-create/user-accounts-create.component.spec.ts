import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountsCreateComponent } from './user-accounts-create.component';

describe('UserAccountsCreateComponent', () => {
  let component: UserAccountsCreateComponent;
  let fixture: ComponentFixture<UserAccountsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
