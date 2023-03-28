import { AsyncPipe, Location, NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Observable, Subject, take, takeUntil } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';

import { fadeAnimation, ResponseStatus, TemplateModulePermission, TemplateModulePermissionName } from '@vsp/clients/core';
import { removeEmptyKeys } from '@vsp/admin/shared/utils';

import { buildTemplateModulePermissionNameForm } from '../../components/template-module-permission-name-form/template-module-permission-name-form.builder';
import { mapAssignableModulePermissionsToTemplateModulePermissions } from '../../utils';

import { PermissionsSelectors } from '@vsp/admin/store/permissions';
import { SecurityPermissionsActions, SecurityPermissionsSelectors, SecurityPermissionsState } from '../../store';
import { TemplateModulePermissionNameFormComponent } from '../../components/template-module-permission-name-form/template-module-permission-name-form.component';


@Component({
  selector: 'vsp-security-permissions-update',
  templateUrl: './security-permissions-update.component.html',
  styleUrls: ['./security-permissions-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NzBreadCrumbModule,
    NzButtonModule,
    NzCardModule,
    NzPageHeaderModule,
    ReactiveFormsModule,
    TemplateModulePermissionNameFormComponent,
  ]
})
export class SecurityPermissionsUpdateComponent implements OnInit, OnDestroy {
  private readonly _location: Location = inject(Location);
  private readonly _formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);
  private readonly _store: Store = inject(Store);
  private readonly _messageService: NzMessageService = inject(NzMessageService);
  private readonly _destroy$: Subject<any> = new Subject<any>();

  public updateTemplateModulePermissionNameForm!: UntypedFormGroup;

  public selectedTemplateModulePermissionName$: Observable<TemplateModulePermissionName | null> = this._store
      .select(SecurityPermissionsSelectors.selectSelectedTemplateModulerPermissionName);

  constructor() {
    this._initializeForm();
  }

  ngOnInit(): void {
    this._listenForSelectedUserAccountChanges();
  }

  // @TODO(jason) create type for this form
  public onUpdateTempalteModulePermissionName(template: any): void {
    if (this.updateTemplateModulePermissionNameForm.invalid) return;

    console.log('before stripping undefined/nulls', template);
    removeEmptyKeys(template);

    console.log('template is ', template);

    this._store.dispatch(SecurityPermissionsActions.updateTemplateModulePermissionNameRequest({
      templateModulePermissionNameId: template.templateModulePermissionName.id,
      templateModulePermissionName: template 
    }));

    this._store.select(SecurityPermissionsSelectors.selectUpdateTemplateModulePermissionNameResponseMessage)
      .pipe(
        filter(message => !!message),
        take(1)
      )
      .subscribe(message => {
        if (message?.status === ResponseStatus.SUCCESS) {
          this._resetUpdateUserAccountForm();
          this._messageService.success(message?.message || 'Success!')
          this._location.back();
        } else {
          this._messageService.error(message?.message || 'Error!')
        }
        this._store.dispatch(SecurityPermissionsActions.setUpdateTemplateModulePermissionNameResponseMessage({ message: null } ))
      });
  }

  private _resetUpdateUserAccountForm(): void {
    this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(take(1))
      .subscribe(assignableModulePermissions => {
        const userModulerPermissions: TemplateModulePermission[] = mapAssignableModulePermissionsToTemplateModulePermissions(assignableModulePermissions || []) || [];
        const blankFormGroup = buildTemplateModulePermissionNameForm(this._formBuilder, userModulerPermissions);
        this.updateTemplateModulePermissionNameForm.reset();
        this.updateTemplateModulePermissionNameForm.patchValue({ ...blankFormGroup?.value });
      });
  }

  private _initializeForm(): void {
    this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(take(1))
      .subscribe(assignableModulePermissions => {
        const templateModulerPermissions: TemplateModulePermission[] = 
          mapAssignableModulePermissionsToTemplateModulePermissions(assignableModulePermissions || []) || [];
        
        this.updateTemplateModulePermissionNameForm = 
          buildTemplateModulePermissionNameForm(this._formBuilder, templateModulerPermissions || []);
      });
  }

  private _listenForSelectedUserAccountChanges(): void {
    this._store.select(SecurityPermissionsSelectors.selectSelectedTemplateModulerPermissionName)
      .pipe(takeUntil(this._destroy$))
      .subscribe(selectedTemplateModulePermissionName => {

        // Patch Template Moduler Permission Name Details
        this.updateTemplateModulePermissionNameForm?.get('templateModulePermissionName')?.patchValue({
          id: selectedTemplateModulePermissionName?.id || null,
          name: selectedTemplateModulePermissionName?.name || null,
          description: selectedTemplateModulePermissionName?.description || null
        });

        // Patch Template Moduler Permission Name Permissions
        (this.updateTemplateModulePermissionNameForm?.get('templateModulePermissions') as UntypedFormArray)?.controls.forEach(control => {
          const templateModulePermissionFormGroup: UntypedFormGroup = control as UntypedFormGroup;

          const templateModulePermission: TemplateModulePermission | undefined = selectedTemplateModulePermissionName
            ?.templateModulePermissions
            ?.find(ump => ump?.modulePermission?.id === templateModulePermissionFormGroup?.value?.modulePermission?.id);

          templateModulePermissionFormGroup?.patchValue({
            ...templateModulePermission,
            canCreateAll: templateModulePermission?.templatePermissions?.some(up => up.canCreate) || false,
            canReadAll: templateModulePermission?.templatePermissions?.some(up => up.canRead) || false,
            canUpdateAll: templateModulePermission?.templatePermissions?.some(up => up.canUpdate) || false,
            canDeleteAll: templateModulePermission?.templatePermissions?.some(up => up.canDelete) || false
          }, {emitEvent: false});
        });
      });
  }

  ngOnDestroy(): void {
    this._store.dispatch(SecurityPermissionsActions.setSelectedTemplateModulePermissionName({ 
      templateModulePermissionName: null
    }));
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
