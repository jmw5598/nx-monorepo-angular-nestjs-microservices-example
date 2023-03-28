import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { Page, PageRequest, Sort, fadeAnimation, TemplateModulePermissionName } from '@vsp/clients/core';
import { VspDatatableComponent, VspDatatableWidgetColumnEditorComponent, TableDefinition } from '@vsp/clients/datatable';
import { BasicQuerySearchFilter, BasicQuerySearchWithDeletedFilterComponent } from '@vsp/query-search-filters';

import { defaultBasicQuerySearchFilter, defaultPageRequest } from '@vsp/admin/core/constants';

import { SecurityPermissionsActions, SecurityPermissionsSelectors, SecurityPermissionsState } from '../../store';
import { defaultSecurityPermissionsSort } from '../../constants/sort.defaults';

@Component({
  selector: 'vsp-security-permissions',
  templateUrl: './security-permissions.component.html',
  styleUrls: ['./security-permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    BasicQuerySearchWithDeletedFilterComponent,
    NgIf,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzIconModule,
    NzPageHeaderModule,
    NzPopconfirmModule,
    VspDatatableWidgetColumnEditorComponent,
    VspDatatableComponent,
    RouterLink,
  ]
})
export class SecurityPermissionsComponent {
  private readonly _store: Store = inject(Store);

  public securityPermissionsTemplateTableDefinition$: Observable<TableDefinition | null> = this._store
      .select(SecurityPermissionsSelectors.selectSecurityPermissionsTableDefinition);

  public securityPermissionsTemplatePage$: Observable<Page<TemplateModulePermissionName> | null> = this._store
      .select(SecurityPermissionsSelectors.selectTemplateModulePermissionNamesPage);

  private _defaultPageRequest: PageRequest = defaultPageRequest;
  public defaultSort: Sort = defaultSecurityPermissionsSort;

  public templateModulePermissionsSearchFilter!: BasicQuerySearchFilter | null;
  public templateModulePermissionsSearchFilter$: Observable<BasicQuerySearchFilter | null> = this._store
    .select(SecurityPermissionsSelectors.selectTemplateModulePermissionSearchFilter)
    .pipe(tap(filter => this.templateModulePermissionsSearchFilter = filter));

  public onSearchFilterChanges(filter: BasicQuerySearchFilter): void {
    this._store.dispatch(
      SecurityPermissionsActions.setTemplateModulePermissionsSearchFilter({ 
        filter : filter
      })
    );
    this._searchTemplateModulePermissions(filter, this._defaultPageRequest);
  }

  public onDeleteTemplateModulePermissionName(templateModulePermissionName: TemplateModulePermissionName): void {
    this._store.dispatch(
      SecurityPermissionsActions.deleteTemplateModulePermissionNameRequest({
        templateModulePermissionNameId: templateModulePermissionName.id
      })
    )
  }

  public onRestoreTemplateModulePermissionName(templateModulePermissionName: TemplateModulePermissionName): void {
    this._store.dispatch(
      SecurityPermissionsActions.restoreTemplateModulePermissionNameRequest({
        templateModulePermissionNameId: templateModulePermissionName.id
      })
    )
  }

  public onSecurityPermissionsPageChange(pageRequest: PageRequest): void {
    this._searchTemplateModulePermissions(this.templateModulePermissionsSearchFilter, pageRequest);
  }

  public onApplyColumnChanges(tableDefinition: TableDefinition | null): void {
    this._store.dispatch(
      SecurityPermissionsActions.setSecurityPermissionsTableDefinition({
        tableDefinition: tableDefinition
      })
    );
  }

  public onResetColumnChanges(shouldReset: boolean): void {
    if (shouldReset) {
      this._store.dispatch(SecurityPermissionsActions.resetSecurityPermissionsTableDefinition());
    }
  }

  private _searchTemplateModulePermissions(filter: BasicQuerySearchFilter | null, pageRequest: PageRequest): void {
    this._store.dispatch(
      SecurityPermissionsActions.searchTemplateModulePermissionsNamesRequest({
        filter: filter || defaultBasicQuerySearchFilter,
        pageRequest: pageRequest
      })
    );
  }
}
