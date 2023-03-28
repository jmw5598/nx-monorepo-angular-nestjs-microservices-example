import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'vsp-error-unauthorized',
  templateUrl: './error-unauthorized.component.html',
  styleUrls: ['./error-unauthorized.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzButtonModule,
    NzResultModule,
    RouterLink,
  ]
})
export class ErrorUnauthorizedComponent { }
