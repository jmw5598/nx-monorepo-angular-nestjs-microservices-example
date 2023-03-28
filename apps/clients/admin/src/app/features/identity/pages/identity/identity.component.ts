import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { fadeAnimation } from '@vsp/clients/core';

@Component({
  selector: 'vsp-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    NzDividerModule,
    NzGridModule,
    RouterOutlet,
  ]
})
export class IdentityComponent {

}
