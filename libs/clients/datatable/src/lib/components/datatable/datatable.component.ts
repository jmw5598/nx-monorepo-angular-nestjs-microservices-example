import { CurrencyPipe, DatePipe, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

import { Page, PageRequest, Sort, SortDirection } from '@vsp/core';

import { ColumnType } from '../../models/column-type.enum';
import { DEFAULT_PJO_DATATABLE_SETTINGS, VspDatatableSettings } from '../../models/datatable-settings.model';
import { TableDefinition } from '../../models/table-definition.model';
import { VspDeepPropertyAccessPipe } from '../../pipes/deep-property-access.pipe';
import { VspTruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'vsp-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    FormsModule,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgTemplateOutlet,
    NzTableModule,
    NzAvatarModule,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    NzCheckboxModule,
    VspDeepPropertyAccessPipe,
    VspTruncatePipe,
    TitleCasePipe,
  ]
})
export class VspDatatableComponent {
  @Input()
  public definition: TableDefinition | null = null;

  @Input()
  public page: Page<any> | null = null;

  private _settings: VspDatatableSettings = DEFAULT_PJO_DATATABLE_SETTINGS;

  @Input()
  public set settings(settings: VspDatatableSettings) {
    this._settings = {
      ...DEFAULT_PJO_DATATABLE_SETTINGS,
      ...settings
    } as VspDatatableSettings;
  }

  @Input()
  public defaultSort: Sort = {
    column: 'id',
    direction: SortDirection.Descend
  } as Sort;

  public get settings(): VspDatatableSettings {
    return this._settings;
  }

  @Input()
  public actionsContent: TemplateRef<any> | null = null;

  @Input()
  public actionsWidth: string | null = '150px';

  @Output()
  public pageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();

  public ColumnType = ColumnType;
  public SortDirection = SortDirection;

  public pageIndexChanged(page: number): void {
    this.pageChange.emit({
      index: page - 1,
      size: this.page?.current?.size || 10,
      sort: this.page?.current?.sort 
        ? { ...this.page.current.sort} as Sort 
        : null
    } as PageRequest);
  }

  public pageSizeChanged(size: number): void {
    this.pageChange.emit({
      index: 0,
      size: size || 20,
      sort: this.page?.current?.sort 
        ? { ...this.page.current.sort} as Sort 
        : this.defaultSort
    } as PageRequest);
  }

  public sortOrderChanged(column: string, direction: string | null): void {
    const sortDirection: SortDirection | null = direction 
      ? (direction === 'ascend' ? SortDirection.Ascend : SortDirection.Descend) 
      : null;
    
    this.pageChange.emit({
      index: 0, 
      size: this.page?.current?.size || 10,
      sort: sortDirection 
        ? { column: column, direction: sortDirection } 
        : this.defaultSort
    });
  }
}
