import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, take, tap } from 'rxjs';

import { Store } from '@ngrx/store';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { fadeAnimation, ResponseMessage, ValidationPatterns, ResetPassword, MatchValidators, ResponseStatus } from '@vsp/clients/core';

import { AccountsActions, AccountsSelectors } from '../../store';

@Component({
  selector: 'vsp-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
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
    NzGridModule,
    NzInputModule,
    NzPageHeaderModule,
    ReactiveFormsModule,
    RouterLink,
  ]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  public resetPasswordForm: UntypedFormGroup;

  public resetPasswordResponseMessage$!: Observable<ResponseMessage | null>;

  constructor(
    private _store: Store,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.resetPasswordForm = this._buildResetPasswordForm();

    this._route
      .queryParamMap
      .pipe(take(1))
      .subscribe((params: ParamMap) => {
        const resetToken: string = params.get('t') || '';
        const email: string = params.get('e') || ''

        if (resetToken?.length && email?.length) {
          // Patch query params to form
          this.resetPasswordForm.patchValue({ 
            resetToken: params.get('t') || '',
            email: params.get('e') || ''
          });
          // Clear query params
          // this._router.navigate([], { relativeTo: this._route, queryParams: {} });
        } else {
          // If no query params redirect to signIn
          this._router.navigate(['/auth/signIn']);
        }
      });
  }

  ngOnInit(): void {
    this.resetPasswordResponseMessage$ = this._store
      .select(AccountsSelectors.selectResetPasswordRequestResponseMessage)
      .pipe(tap(message => {
        if (message?.status === ResponseStatus.SUCCESS) {
          this.resetPasswordForm.reset();
        }
      }));
  }

  public onResetPasswordRequest(request: ResetPassword): void {
    if (this.resetPasswordForm.valid) {
      this._store.dispatch(AccountsActions.resetPasswordRequest({ request }));
    } else {
      Object.values(this.resetPasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private _buildResetPasswordForm(): UntypedFormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(ValidationPatterns.password)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(ValidationPatterns.password)]],
      resetToken: ['', [Validators.required]]
    }, { 
      validators: MatchValidators.mustMatch('password', 'confirmPassword') 
    })
  }

  ngOnDestroy(): void {
    this._store.dispatch(
      AccountsActions.setResetPasswordRequestResponseMessage({ message: null })
    );
  }
}
