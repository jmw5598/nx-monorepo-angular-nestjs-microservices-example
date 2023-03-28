import { ChangeDetectionStrategy, Component } from '@angular/core';

import { fadeAnimation } from '@vsp/clients/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@Component({
  selector: 'vsp-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    NzBreadCrumbModule,
    NzCardModule,
    NzPageHeaderModule,
  ]
})
export class AccountProfileComponent { }
