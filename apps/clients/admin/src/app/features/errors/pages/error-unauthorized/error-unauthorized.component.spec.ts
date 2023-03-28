import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorUnauthorizedComponent } from './error-unauthorized.component';

describe('ErrorUnauthorizedComponent', () => {
  let component: ErrorUnauthorizedComponent;
  let fixture: ComponentFixture<ErrorUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorUnauthorizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
