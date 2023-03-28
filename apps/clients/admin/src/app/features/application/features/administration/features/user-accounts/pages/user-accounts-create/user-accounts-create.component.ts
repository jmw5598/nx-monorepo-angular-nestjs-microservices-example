import { AsyncPipe, Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { filter, Observable, skip, Subject, take } from 'rxjs';

import { Store } from '@ngrx/store';

import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

import { ResponseStatus, fadeAnimation, TemplateModulePermissionName, UserModulePermission } from '@vsp/clients/core';
import { PermissionsSelectors } from '@vsp/admin/store/permissions';
import { UserValidators } from '@vsp/admin/core/validators';
import { removeEmptyKeys } from '@vsp/admin/shared/utils';

import { buildUserAccountCreateForm } from '../../components/user-account-create-form/user-account-create-form.builder';
import { UserAccountsSelectors, UserAccountsActions, UserAccountsState } from '../../store';

import { 
  mapAssignableModulePermissionsToUserModulePermissions, 
  templateModulerPermissionsToUserModulerPermissions, 
  userAccountFormToUserAccount } from '../../utils';

import { UserAccountCreateFormComponent } from '../../components/user-account-create-form/user-account-create-form.component';

@Component({
  selector: 'vsp-user-accounts-create',
  templateUrl: './user-accounts-create.component.html',
  styleUrls: ['./user-accounts-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    NzBreadCrumbModule,
    NzButtonModule,
    NzCardModule,
    NzPageHeaderModule,
    NzMessageModule,
    UserAccountCreateFormComponent,
    ReactiveFormsModule,
  ]
})
export class UserAccountsCreateComponent implements OnDestroy {
  private readonly _location: Location = inject(Location);
  private readonly _formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);
  private readonly _store: Store = inject(Store);
  private readonly _userValidators: UserValidators = inject(UserValidators);
  private readonly _messageService: NzMessageService = inject(NzMessageService);
  private readonly _destroy$: Subject<any> = new Subject<any>();

  @ViewChild(UserAccountCreateFormComponent)
  public formComponent!: UserAccountCreateFormComponent

  public createUserAccountForm!: UntypedFormGroup;

  public templateModulePermissionNames$: Observable<TemplateModulePermissionName[] | null>  = 
    this._store.select(UserAccountsSelectors.selectTemplateModulePermissionNames);

  constructor() {
    this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(take(1))
      .subscribe(assignableModulePermissions => {
        const userModulerPermissions: UserModulePermission[] = mapAssignableModulePermissionsToUserModulePermissions(assignableModulePermissions || []) || [];
        this.createUserAccountForm = buildUserAccountCreateForm(this._formBuilder, this._userValidators, userModulerPermissions);
      });
  }

  public onCreateUserAccount(formValue: any, shouldReturn: boolean): void {
    if (this.createUserAccountForm.invalid) return;

    const userAccount = userAccountFormToUserAccount(formValue);
    removeEmptyKeys(userAccount);

    this._store.dispatch(UserAccountsActions.createUserAccountRequest({ userAccount: userAccount }));

    this._store.select(UserAccountsSelectors.selectCreateUserAccountResponseMessage)
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
        } else if (message?.status === ResponseStatus.ERROR) {
          this._messageService.error(message?.message || 'Error!')
        }
        this._store.dispatch(UserAccountsActions.setCreateUserAccountRequestResponseMessage({ message: null } ))
      });
  }


  public onTemplateModulePermissionNameSelected(templateModulePermissionName: TemplateModulePermissionName | null): void {
    if (!templateModulePermissionName) {
      this._resetUserModulerPerrmisionsFormArray();
      return;
    }

    this._store.dispatch(
      UserAccountsActions.getTemplateModulePermissionNameByIdRequest({
        templateModulePermissionNameId: templateModulePermissionName.id
      })
    );

    this._store.select(UserAccountsSelectors.selectSelectedTemplateModulePermissionName)
      .pipe(skip(1), take(1))
      .subscribe(templateModulePermissionName => {
        const userModulePermissions = templateModulerPermissionsToUserModulerPermissions(
            templateModulePermissionName?.templateModulePermissions || []);

        this._patchUserModulePermissionsToForm(userModulePermissions);
      });
  }


  private _patchUserModulePermissionsToForm(userModulePermissions: UserModulePermission[]): void {
    (this.createUserAccountForm.get('userModulePermissions') as UntypedFormArray)
      .controls.forEach((group) => {
        const userModulePermission = userModulePermissions
          .find(ump => ump.modulePermission?.id === group.value.modulePermission.id);

        group.patchValue({
          ...userModulePermission
        });
      });
  }


  private _resetCreateUserAccountForm(): void {
    this.createUserAccountForm.reset();
    this._resetUserModulerPerrmisionsFormArray();
  }


  private _resetUserModulerPerrmisionsFormArray(): void {
    this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(take(1))
      .subscribe(assignableModulePermissions => {
        const userModulerPermissions: UserModulePermission[] = mapAssignableModulePermissionsToUserModulePermissions(assignableModulePermissions || []) || [];
        const blankFormGroup = buildUserAccountCreateForm(this._formBuilder, this._userValidators, userModulerPermissions);
        const userModulePermissionsFormGroup = blankFormGroup.get('userModulePermissions');

        if ( userModulePermissionsFormGroup) {
          this.createUserAccountForm
            ?.get('userModulePermissions')
            ?.patchValue([ ...(userModulePermissionsFormGroup.value || []) ]);
        }
        
        this.formComponent?.autoFocusControl?.setFocusToControl();
      });
  }


  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
    this._store.dispatch(UserAccountsActions.resetSelectedUserAccountStateSlice());
  }
}
