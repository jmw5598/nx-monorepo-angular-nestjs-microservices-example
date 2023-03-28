import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateModulePermissionNameFormComponent } from './template-module-permission-name-form.component';

describe('TemplateModulePermissionNameFormComponent', () => {
  let component: TemplateModulePermissionNameFormComponent;
  let fixture: ComponentFixture<TemplateModulePermissionNameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateModulePermissionNameFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateModulePermissionNameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
