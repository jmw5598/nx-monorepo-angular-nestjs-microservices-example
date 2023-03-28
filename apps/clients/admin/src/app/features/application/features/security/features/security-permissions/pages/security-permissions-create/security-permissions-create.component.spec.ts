import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPermissionsCreateComponent } from './security-permissions-create.component';

describe('SecurityPermissionsCreateComponent', () => {
  let component: SecurityPermissionsCreateComponent;
  let fixture: ComponentFixture<SecurityPermissionsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityPermissionsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPermissionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
