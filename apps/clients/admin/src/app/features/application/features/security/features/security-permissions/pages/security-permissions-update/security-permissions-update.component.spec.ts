import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPermissionsUpdateComponent } from './security-permissions-update.component';

describe('SecurityPermissionsUpdateComponent', () => {
  let component: SecurityPermissionsUpdateComponent;
  let fixture: ComponentFixture<SecurityPermissionsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityPermissionsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPermissionsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
