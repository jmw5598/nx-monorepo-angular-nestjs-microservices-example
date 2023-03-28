import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { VspHasModulePermissionPipe, VspHasPermissionPipe } from '@vsp/admin/shared/permissions';
import { AdminNavigationLink } from '@vsp/admin/core/models';
import { fadeAnimation, UserSettings, UserModulesAndPermissionsMap } from '@vsp/clients/core';

import { defaultNavigationMenu } from '../../constants/navigation-menu.defaults';
import { NavigationMenuService } from '../../services/navigation-menu.service';

import { UserSelectors } from '@vsp/admin/store/user';

@Component({
  selector: 'vsp-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    NzDropDownModule,
    NzAvatarModule,
    VspHasModulePermissionPipe,
    VspHasPermissionPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ]
})
export class ApplicationComponent {
  private readonly _navigationMenuService: NavigationMenuService = inject(NavigationMenuService);
  private readonly _store: Store = inject(Store);

  public isCollapsed$: Observable<boolean> = this._navigationMenuService.isCollapsed();
  public defaultNavigationMenu: AdminNavigationLink[] = defaultNavigationMenu;

  public userSettings$: Observable<UserSettings | null> = this._store.select(UserSelectors.selectUserSettings);

  public userModulePermissionsMap$: Observable<UserModulesAndPermissionsMap | null> = 
    this._store.select(UserSelectors.selectUserModulePermissionsMap);

  public onToggleNavigationMenu(): void {
    this._navigationMenuService.toggleMenu();
  }
}
