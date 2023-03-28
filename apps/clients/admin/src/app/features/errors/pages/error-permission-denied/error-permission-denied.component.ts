import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterLink } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'vsp-error-permission-denied',
  templateUrl: './error-permission-denied.component.html',
  styleUrls: ['./error-permission-denied.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:  [
    NzButtonModule,
    NzResultModule,
    RouterLink, 
  ]
})
export class ErrorPermissionDeniedComponent { }
