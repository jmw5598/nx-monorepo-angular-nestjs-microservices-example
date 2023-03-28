import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPermissionDeniedComponent } from './error-permission-denied.component';

describe('ErrorPermissionDeniedComponent', () => {
  let component: ErrorPermissionDeniedComponent;
  let fixture: ComponentFixture<ErrorPermissionDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPermissionDeniedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPermissionDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
