import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

import { fadeAnimation } from '@vsp/clients/core';

@Component({
  selector: 'vsp-security-general',
  templateUrl: './security-general.component.html',
  styleUrls: ['./security-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    NzBreadCrumbModule,
    NzCardModule,
    NzPageHeaderModule,
  ]
})
export class SecurityGeneralComponent { }
