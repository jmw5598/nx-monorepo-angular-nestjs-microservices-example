import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { isCollapsedByDefault } from '@vsp/admin/core/constants';
import { compose } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {
  private _isCollapsed: boolean = true;
  private _isCollapsedSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isCollapsed);

  public isCollapsed(): Observable<boolean> {
    return this._isCollapsedSource.asObservable();
  }

  public toggleMenu(): void {
    // console.log(" collapsed");
    this._isCollapsed = !this._isCollapsed;
    this._isCollapsedSource.next(this._isCollapsed);
  }
}
