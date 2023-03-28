import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPermissionsComponent } from './security-permissions.component';

describe('SecurityPermissionsComponent', () => {
  let component: SecurityPermissionsComponent;
  let fixture: ComponentFixture<SecurityPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityPermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
