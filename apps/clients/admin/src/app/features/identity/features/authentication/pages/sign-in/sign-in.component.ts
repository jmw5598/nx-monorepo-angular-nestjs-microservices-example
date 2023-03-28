import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

import { Credentials } from '@vsp/clients/core';

import { fadeAnimation, EnvironmentService, ResponseMessage, Roles } from '@vsp/clients/core';

import { RootState } from '@vsp/admin/store';
import { AuthenticationActions, AuthenticationSelectors } from '../../store';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'vsp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzPageHeaderModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class SignInComponent {
  public signInForm: UntypedFormGroup;

  public signInResponseMessage$!: Observable<ResponseMessage | null>;

  constructor(
    private _environmentService: EnvironmentService,
    private _store: Store<RootState>,
    private _formBuilder: UntypedFormBuilder
  ) {
    this.signInForm = this._buildSignInForm();
    this.signInResponseMessage$ = this._store.select(AuthenticationSelectors.selectedSignInResponseMessage);
  }

  public onSignInUser(credentials: Credentials): void {
    if (this.signInForm.valid) {
      this._store.dispatch(AuthenticationActions.signInUserRequest({ credentials }))
    } else {
      Object.values(this.signInForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private _buildSignInForm(): UntypedFormGroup {
    return this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false, [Validators.required]],
      requiredRoles: this._formBuilder.array([Roles.Admin])
    });
  }
}
