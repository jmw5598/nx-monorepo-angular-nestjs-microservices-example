import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, debounceTime, filter, map, Observable, of, switchMap, take } from 'rxjs';
import { ValidationResult } from '@vsp/clients/core';

import { UsersService } from '@vsp/admin/core/services';

@Injectable({
  providedIn: 'root'
})
export class UserValidators  {
  private readonly _usersService: UsersService = inject(UsersService);

  public validateEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      return control.valueChanges.pipe(
        debounceTime(500),
        filter(value => value.trim().length > 0),
        take(1),
        switchMap(() => this._usersService.verifyEmail(control.value)
          .pipe(
            map((result: ValidationResult) => result.isValid ? null : { emailExists: true }),
            catchError(error => of(null))
          )
        )
      );
    }
  }

  public validateUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      return control.valueChanges.pipe(
        debounceTime(500),
        filter(value => value.trim().length > 0),
        take(1),
        switchMap(() => this._usersService.verifyUserName(control.value)
          .pipe(
            map((result: ValidationResult) => result.isValid ? null : { userNameExists: true }),
            catchError(error => of(null))
          )
        )
      );
    }
  }
}