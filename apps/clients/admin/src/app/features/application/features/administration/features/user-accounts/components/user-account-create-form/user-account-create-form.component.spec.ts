import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountCreateFormComponent } from './user-account-create-form.component';

describe('UserAccountCreateFormComponent', () => {
  let component: UserAccountCreateFormComponent;
  let fixture: ComponentFixture<UserAccountCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
