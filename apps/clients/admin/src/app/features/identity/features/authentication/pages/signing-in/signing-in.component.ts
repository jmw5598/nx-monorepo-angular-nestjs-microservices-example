import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, take } from 'rxjs';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { fadeAnimation } from '@vsp/clients/core';

import { RootState } from '@vsp/admin/store';
import { UserActions, UserSelectors } from '@vsp/admin/store/user';

@Component({
  selector: 'vsp-signing-in',
  templateUrl: './signing-in.component.html',
  styleUrls: ['./signing-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    NzCardModule,
    NzSpinModule,
  ]
})
export class SigningInComponent implements OnInit {

  constructor(
    private _router: Router,
    private _store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this._dispatchActionsForUserSettingsAndPermissions();
    this._listenForUserSettingsAndPermissionsResolution();
  }

  private _dispatchActionsForUserSettingsAndPermissions(): void {
    // this._store.dispatch(UserActions.getUserPermissionsRequest());
    // this._store.dispatch(UserActions.getUserSettingsRequest());
  }

  private _listenForUserSettingsAndPermissionsResolution(): void {
    // @TEMP - Disable getting permissins until backend is done
    setTimeout(() => this._router.navigateByUrl('/app/dashboard'), 2000);

    // combineLatest([
    //   this._store.select(UserSelectors.selectUserSettings),
    //   this._store.select(UserSelectors.selectUserModulePermissionsMap)
    // ])
    // .pipe(
    //   filter(([settings, permissions]) => !!settings && !!permissions),
    //   take(1)
    // )
    // .subscribe(([settings, permissions]) => {
    //   this._router.navigateByUrl('/app/dashboard')
    // });
  }
}
