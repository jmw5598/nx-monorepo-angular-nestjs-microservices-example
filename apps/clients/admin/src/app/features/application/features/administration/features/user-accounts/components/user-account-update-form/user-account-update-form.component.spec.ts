import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountUpdateFormComponent } from './user-account-update-form.component';

describe('UserAccountUpdateFormComponent', () => {
  let component: UserAccountUpdateFormComponent;
  let fixture: ComponentFixture<UserAccountUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
