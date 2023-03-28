import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { ResponseMessage, fadeAnimation, ResponseStatus, adminClientIdentifier, ForgotPassword } from '@vsp/clients/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { Observable, tap } from 'rxjs';

import { AccountsActions, AccountsSelectors } from '../../store';

@Component({
  selector: 'vsp-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzPageHeaderModule,
    ReactiveFormsModule,
    RouterLink,
  ]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public forgotPasswordForm: UntypedFormGroup;

  public forgotPasswordRequestResponseMessage$!: Observable<ResponseMessage | null>;

  constructor(
    private _store: Store,
    private _formBuilder: UntypedFormBuilder
  ) {
    this.forgotPasswordForm = this._buildForgotPasswordForm();
  }

  ngOnInit(): void {
    this.forgotPasswordRequestResponseMessage$ = this._store
      .select(AccountsSelectors.selectForgotPasswordRequestResponseMessage)
      .pipe(tap(message => {
        if (message?.status === ResponseStatus.SUCCESS) {
          this.forgotPasswordForm.reset();
        }
      }));
  }

  public onForgotPasswordRequest(request: ForgotPassword): void {
    if (this.forgotPasswordForm.valid) {
      this._store.dispatch(AccountsActions.forgotPasswordRequest({ request }));
    } else {
      Object.values(this.forgotPasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private _buildForgotPasswordForm(): UntypedFormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      client: [adminClientIdentifier, [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this._store.dispatch(
      AccountsActions.setForgotPasswordRequestResponseMessage({ message: null })
    );
  }
}
