import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';


import { fadeAnimation, Page, PageRequest, Sort, UserAccountDto } from '@vsp/clients/core';
import { defaultBasicQuerySearchFilter, defaultPageRequest } from '@vsp/admin/core/constants';
import { VspDatatableComponent, VspDatatableWidgetColumnEditorComponent, TableDefinition } from '@vsp/clients/datatable';
import { BasicQuerySearchFilter, BasicQuerySearchFilterComponent } from '@vsp/query-search-filters';

import { UserAccountsActions, UserAccountsState, UserAccountsSelectors } from '../../store';
import { defaultUserAccountsSort } from '../../constants/sort.defaults';

@Component({
  selector: 'vsp-user-accounts-overview',
  templateUrl: './user-accounts-overview.component.html',
  styleUrls: ['./user-accounts-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    BasicQuerySearchFilterComponent,
    NzBreadCrumbModule,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzPageHeaderModule,
    NzPopoverModule,
    VspDatatableComponent,
    VspDatatableWidgetColumnEditorComponent,
    RouterLink
  ]
})
export class UserAccountsOverviewComponent {
  private readonly _store: Store = inject(Store);

  public userAccountsPage$: Observable<Page<UserAccountDto> | null> = 
    this._store.select(UserAccountsSelectors.selectUserAccountsPage);

  private _defaultPageRequest: PageRequest = defaultPageRequest;
  public defaultSort: Sort = defaultUserAccountsSort;

  public userAccountsSearchFilter$: Observable<BasicQuerySearchFilter | null> = this._store
    .select(UserAccountsSelectors.selectUserAccountSearchFilter)
    .pipe(tap(filter => this.userAccountsSearchFilter = filter));

  public userAccountsSearchFilter!: BasicQuerySearchFilter | null;

  public userAccountsTableDefinition$: Observable<TableDefinition | null> = 
    this._store.select(UserAccountsSelectors.selectUserAccountsTableDefinition);

  public onSearchFilterChanges(filter: BasicQuerySearchFilter): void {
    this._store.dispatch(UserAccountsActions.setUserAccountsSearchFilter({ filter: filter }));
    this._searchUserAccounts(filter, this._defaultPageRequest);
  }

  public onUserAccountsPageChange(pageRequest: PageRequest): void {
    this._searchUserAccounts(this.userAccountsSearchFilter, pageRequest);
  }

  public onApplyColumnChanges(tableDefinition: TableDefinition | null): void {
    this._store.dispatch(
      UserAccountsActions.setUserAccountsTableDefinition({
        tableDefinition: tableDefinition
      })
    );
  }

  public onResetColumnChanges(shouldReset: boolean): void {
    if (shouldReset) {
      this._store.dispatch(UserAccountsActions.resetUserAccountsTableDefinition());
    }
  }

  private _searchUserAccounts(filter: BasicQuerySearchFilter | null, pageRequest: PageRequest): void {
    this._store.dispatch(UserAccountsActions.searchUserAccountsRequest({
      filter: filter || defaultBasicQuerySearchFilter,
      pageRequest: pageRequest
    }));
  }
}
