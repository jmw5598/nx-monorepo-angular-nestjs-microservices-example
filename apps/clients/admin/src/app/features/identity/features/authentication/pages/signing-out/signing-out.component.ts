import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { fadeAnimation } from '@vsp/clients/core';

import { AuthenticationActions, AuthenticationState, AuthenticationSelectors } from '../../store';

@Component({
  selector: 'vsp-signing-out',
  templateUrl: './signing-out.component.html',
  styleUrls: ['./signing-out.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    NzCardModule,
    NzSpinModule,
  ]
})
export class SigningOutComponent implements OnInit {
  constructor(
    private _store: Store<AuthenticationState>,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._store.dispatch(AuthenticationActions.signOutUserRequest());
    this._store.select(AuthenticationSelectors.selectAuthenticatedUser)
      .pipe(take(1))
      .subscribe(authenticatedUser => {
        setTimeout(() => this._router.navigateByUrl('/auth/signIn'), 500);
      });
  }
}
