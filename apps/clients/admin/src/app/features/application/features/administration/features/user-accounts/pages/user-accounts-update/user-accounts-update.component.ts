import { AsyncPipe, Location, NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Observable, of, skip, Subject, take, takeUntil } from 'rxjs';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

import { 
  UserAccountDto, 
  TemplateModulePermissionName, 
  UserModulePermission, 
  UserAccount, 
  fadeAnimation, 
  ResponseStatus } from '@vsp/clients/core';

import { removeEmptyKeys } from '@vsp/admin/shared/utils';

import { buildUserAccountUpdateForm } from '../../components/user-account-update-form/user-account-update-form.builder';

import { UserAccountsActions, UserAccountsSelectors, UserAccountsState } from '../../store';
import { PermissionsSelectors } from '@vsp/admin/store/permissions';

import { 
  mapAssignableModulePermissionsToUserModulePermissions, 
  templateModulerPermissionsToUserModulerPermissions, 
  userAccountFormToUserAccount } from '../../utils';

import { UserAccountUpdateFormComponent } from '../../components/user-account-update-form/user-account-update-form.component';

@Component({
  selector: 'vsp-user-accounts-update',
  templateUrl: './user-accounts-update.component.html',
  styleUrls: ['./user-accounts-update.component.scss'],
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
    UserAccountUpdateFormComponent
  ]
})
export class UserAccountsUpdateComponent implements OnInit, OnDestroy {
  private readonly _location: Location = inject(Location);
  private readonly _formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);
  private readonly _store: Store = inject(Store);
  private readonly _messageService: NzMessageService = inject(NzMessageService);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  public updateUserAccountForm!: UntypedFormGroup;

  public selectedUserAccount$: Observable<UserAccountDto | null> = 
    this._store.select(UserAccountsSelectors.selectSelectedUserAccount);

  public templateModulePermissionNames$: Observable<TemplateModulePermissionName[] | null> = 
    this._store.select(UserAccountsSelectors.selectTemplateModulePermissionNames);

  constructor() {
    this._initializeForm();
  }

  ngOnInit(): void {
    this._listenForSelectedUserAccountChanges();
  }

  public onUpdateUserAccount(formValue: any): void {
    if (this.updateUserAccountForm.invalid) return;

    const userAccount = userAccountFormToUserAccount(formValue);
    removeEmptyKeys(userAccount);

    this._store.dispatch(UserAccountsActions.updateUserAccountRequest({ 
      userId: userAccount?.user?.id, 
      userAccount: userAccount 
    }));

    this._store.select(UserAccountsSelectors.selectUpdateUserAccountResponseMessage)
      .pipe(
        filter(message => !!message),
        take(1)
      )
      .subscribe(message => {
        if (message?.status === ResponseStatus.SUCCESS) {
          this._messageService.success(message?.message || 'Success!')
        } else {
          this._messageService.error(message?.message || 'Error!')
        }
        this._store.dispatch(UserAccountsActions.setUpdateUserAccountRequestResponseMessage({ message: null } ));
        this._location.back();
      });
  }

  public onIssuePasswordResetRequest(shouldIssue: boolean): void {
    if (shouldIssue) {
      alert('Issue reset');
    }
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
    (this.updateUserAccountForm.get('userModulePermissions') as UntypedFormArray)
      .controls.forEach((group) => {
        const userModulePermission = userModulePermissions
          .find(ump => ump.modulePermission?.id === group.value.modulePermission.id);

        group.patchValue({
          ...userModulePermission,
          canCreateAll: userModulePermission?.userPermissions?.some(up => up.canCreate) || false,
          canReadAll: userModulePermission?.userPermissions?.some(up => up.canRead) || false,
          canUpdateAll: userModulePermission?.userPermissions?.some(up => up.canUpdate) || false,
          canDeleteAll: userModulePermission?.userPermissions?.some(up => up.canDelete) || false
        }, { emitEvent: false });
      });
  }

  private _resetUserModulerPerrmisionsFormArray(): void {
    this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(take(1))
      .subscribe(assignableModulePermissions => {
        const userModulerPermissions: UserModulePermission[] = mapAssignableModulePermissionsToUserModulePermissions(assignableModulePermissions || []) || [];
        const blankFormGroup = buildUserAccountUpdateForm(this._formBuilder, userModulerPermissions);
        const userModulePermissionsFormGroup = blankFormGroup.get('userModulePermissions');

        console.log('reset permissions ', userModulePermissionsFormGroup);
        if ( userModulePermissionsFormGroup) {
          this.updateUserAccountForm
            ?.get('userModulePermissions')
            ?.patchValue([ ...(userModulePermissionsFormGroup.value || []) ]);
        }
      });
  }
  
  private _initializeForm(): void {
    this._store.select(PermissionsSelectors.selectAssignableModulePermissions)
      .pipe(take(1))
      .subscribe(assignableModulePermissions => {
        const userModulerPermissions: UserModulePermission[] = mapAssignableModulePermissionsToUserModulePermissions(assignableModulePermissions || []) || [];
        this.updateUserAccountForm = buildUserAccountUpdateForm(this._formBuilder, userModulerPermissions);
      });
  }

  private _listenForSelectedUserAccountChanges(): void {
    this._store.select(UserAccountsSelectors.selectSelectedUserAccount)
      .pipe(takeUntil(this._destroy$))
      .subscribe(selectedUserAccount => {
        this.updateUserAccountForm.patchValue({
          // Patch avatarUrl??
        });
        
        // Patch User Details
        this.updateUserAccountForm?.get('user')?.patchValue({
          id: selectedUserAccount?.id || null,
          userName: selectedUserAccount?.userName || null
        });
        
        // Patch Profile Details
        this.updateUserAccountForm?.get('profile')?.patchValue({
          id: selectedUserAccount?.profile?.id || null,
          firstName: selectedUserAccount?.profile?.firstName || null,
          lastName: selectedUserAccount?.profile?.lastName || null
        });

        // Patch User Permissions
        this._patchUserModulePermissionsToForm(selectedUserAccount?.userModulePermissions || []);
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._store.dispatch(UserAccountsActions.resetSelectedUserAccountStateSlice());
  }
}
