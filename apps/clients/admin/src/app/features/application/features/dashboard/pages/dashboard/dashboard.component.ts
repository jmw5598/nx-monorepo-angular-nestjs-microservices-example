import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { fadeAnimation } from '@vsp/clients/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'vsp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    NzBreadCrumbModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzTypographyModule
  ]
})
export class DashboardComponent { }
