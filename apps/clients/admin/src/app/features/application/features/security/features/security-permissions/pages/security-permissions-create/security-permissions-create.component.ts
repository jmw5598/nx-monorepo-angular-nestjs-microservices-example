import { Component, ChangeDetectionStrategy, ViewChild, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AsyncPipe, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

import { fadeAnimation, ResponseStatus, TemplateModulePermission, TemplateModulePermissionName } from '@vsp/clients/core';

import { buildTemplateModulePermissionNameForm } from '../../components/template-module-permission-name-form/template-module-permission-name-form.builder';
import { mapAssignableModulePermissionsToTemplateModulePermissions } from '../../utils';

import { PermissionsActions, PermissionsSelectors } from '@vsp/admin/store/permissions';
import { removeEmptyKeys } from '@vsp/admin/shared/utils';

import { SecurityPermissionsActions, SecurityPermissionsState, SecurityPermissionsSelectors } from '../../store';
import { TemplateModulePermissionNameFormComponent } from '../../components/template-module-permission-name-form/template-module-permission-name-form.component';


@Component({
  selector: 'vsp-security-permissions-create',
  templateUrl: './security-permissions-create.component.html',
  styleUrls: ['./security-permissions-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    NzBreadCrumbModule,
    NzButtonModule,
    NzCardModule,
    NzPageHeaderModule,
    ReactiveFormsModule,
    TemplateModulePermissionNameFormComponent,
  ]
})
export class SecurityPermissionsCreateComponent {
  private readonly _location: Location = inject(Location);
  private readonly _formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);
  private readonly _store: Store = inject(Store);
  private readonly _messageService: NzMessageService = inject(NzMessageService);
  
  @ViewChild(TemplateModulePermissionNameFormComponent)
  public formComponent!: TemplateModulePermissionNameFormComponent;

  public createTemplateModulePermissionNameForm!: UntypedFormGroup;

  constructor() {
    this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(take(1))
      .subscribe(assignableModulePermissions => {
        const templateModulerPermissions: TemplateModulePermission[] = 
          mapAssignableModulePermissionsToTemplateModulePermissions(assignableModulePermissions || []) || [];
        
          this.createTemplateModulePermissionNameForm = 
          buildTemplateModulePermissionNameForm(this._formBuilder, templateModulerPermissions || []);
      });
  }

  public onCreateTempalteModulePermissionName(template: TemplateModulePermissionName, shouldReturn: boolean): void {
    if (this.createTemplateModulePermissionNameForm.invalid) return;
    removeEmptyKeys(template);

    this._store.dispatch(SecurityPermissionsActions.createTemplateModulePermissionNameRequest({
      templateModulePermissionName: template 
    }));

    this._store.select(SecurityPermissionsSelectors.selectCreateTemplateModulePermissionNameResponseMessage)
      .pipe(
        filter(message => !!message),
        take(1)
      )
      .subscribe(message => {
        if (message?.status === ResponseStatus.SUCCESS) {
          this._resetCreateUserAccountForm();
          this._messageService.success(message?.message || 'Success!')
          if (shouldReturn) {
            this._location.back();
          }
        } else {
          this._messageService.error(message?.message || 'Error!')
        }
        this._store.dispatch(SecurityPermissionsActions.setCreateTemplateModulePermissionNameResponseMessage({ message: null } ))
      });
  }

  private _resetCreateUserAccountForm(): void {
    this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(take(1))
      .subscribe(assignableModulePermissions => {
        const userModulerPermissions: TemplateModulePermission[] = mapAssignableModulePermissionsToTemplateModulePermissions(assignableModulePermissions || []) || [];
        const blankFormGroup = buildTemplateModulePermissionNameForm(this._formBuilder, userModulerPermissions);
        this.createTemplateModulePermissionNameForm.reset();
        this.createTemplateModulePermissionNameForm.patchValue({ ...blankFormGroup?.value });
        this.formComponent?.autoFocusControl?.setFocusToControl();
      });
  }
}
