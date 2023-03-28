import { NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { AbstractControl, ControlContainer, ReactiveFormsModule, UntypedFormArray, UntypedFormGroup } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { VspAutoFocusControlDirective } from '@vsp/clients/forms';

@Component({
  selector: 'vsp-template-module-permission-name-form',
  templateUrl: './template-module-permission-name-form.component.html',
  styleUrls: ['./template-module-permission-name-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NzCheckboxModule,
    NzCollapseModule,
    NzDividerModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzListModule,
    NzSwitchModule,
    ReactiveFormsModule,
  ]
})
export class TemplateModulePermissionNameFormComponent implements OnInit {
  private readonly _controlContainer: ControlContainer = inject(ControlContainer);

  @ViewChild(VspAutoFocusControlDirective)
  public autoFocusControl!: VspAutoFocusControlDirective;
  
  public templateModulePermissionNameForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.templateModulePermissionNameForm = this._controlContainer?.control as UntypedFormGroup;
  }

  public get templateModulePermissions(): UntypedFormArray {
    return this.templateModulePermissionNameForm?.get('templateModulePermissions') as UntypedFormArray;
  }

  public getTemplatePermissionsFormArray(control: AbstractControl): UntypedFormArray {
    const formGroup: UntypedFormGroup = control as UntypedFormGroup;
    return formGroup.get('templatePermissions') as UntypedFormArray;
  }

  public onTemplateModulePermissionAccessChange(event: any, control: AbstractControl): void {
    control?.patchValue({
      canCreateAll: event,
      canReadAll: event,
      canUpdateAll: event,
      canDeleteAll: event
    });
  }

  public onTemplateModulePermissionCanCreateAllChange(event: any, control: AbstractControl): void {
    const formGroup = control as UntypedFormGroup;
    const TemplatePermissionFormArray: UntypedFormArray = formGroup?.get('templatePermissions') as UntypedFormArray;

    if (TemplatePermissionFormArray) {
      TemplatePermissionFormArray?.controls?.forEach(control => {
        const childTemplatePermissionFormGroup: UntypedFormGroup = control as UntypedFormGroup;
        childTemplatePermissionFormGroup?.patchValue({
          canCreate: event
        })
      });
    }
  }

  public onTemplateModulePermissionCanReadAllChange(event: any, control: AbstractControl): void {
    const formGroup = control as UntypedFormGroup;
    const TemplatePermissionFormArray: UntypedFormArray = formGroup?.get('templatePermissions') as UntypedFormArray;

    if (TemplatePermissionFormArray) {
      TemplatePermissionFormArray?.controls?.forEach(control => {
        const TemplatePermissionFormGroup: UntypedFormGroup = control as UntypedFormGroup;
        TemplatePermissionFormGroup?.patchValue({
          canRead: event
        })
      });
    }
  }

  public onTemplateModulePermissionCanUpdateAllChange(event: any, control: AbstractControl): void {
    const formGroup = control as UntypedFormGroup;
    const TemplatePermissionFormArray: UntypedFormArray = formGroup?.get('templatePermissions') as UntypedFormArray;

    if (TemplatePermissionFormArray) {
      TemplatePermissionFormArray?.controls?.forEach(control => {
        const TemplatePermissionFormGroup: UntypedFormGroup = control as UntypedFormGroup;
        TemplatePermissionFormGroup?.patchValue({
          canUpdate: event
        })
      });
    }
  }

  public onTemplateModulePermissionCanDeleteAllChange(event: any, control: AbstractControl): void {
    const formGroup = control as UntypedFormGroup;
    const TemplatePermissionFormArray: UntypedFormArray = formGroup?.get('templatePermissions') as UntypedFormArray;

    if (TemplatePermissionFormArray) {
      TemplatePermissionFormArray?.controls?.forEach(control => {
        const TemplatePermissionFormGroup: UntypedFormGroup = control as UntypedFormGroup;
        TemplatePermissionFormGroup?.patchValue({
          canDelete: event
        })
      });
    }
  }
}
