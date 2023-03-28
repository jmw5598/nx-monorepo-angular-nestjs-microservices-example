import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGeneralComponent } from './security-general.component';

describe('SecurityGeneralComponent', () => {
  let component: SecurityGeneralComponent;
  let fixture: ComponentFixture<SecurityGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
