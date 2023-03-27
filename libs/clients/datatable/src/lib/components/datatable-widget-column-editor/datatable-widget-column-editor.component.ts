import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule, NzPlacementType } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

import { ColumnDefinition } from '../../models/column-definition.model';
import { TableDefinition } from '../../models/table-definition.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'vsp-datatable-widget-column-editor',
  templateUrl: './datatable-widget-column-editor.component.html',
  styleUrls: ['./datatable-widget-column-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DragDropModule,
    FormsModule,
    NgFor,
    NgIf,
    NzTableModule,
    NzAvatarModule,
    NzIconModule,
    NzDropDownModule,
    NzButtonModule,
    NzCheckboxModule
  ]
})
export class VspDatatableWidgetColumnEditorComponent {
  private _tableDefinition: TableDefinition | null = null;

  @Input()
  public set tableDefinition(tableDefinition: TableDefinition | null) {
    this._tableDefinition = (JSON.parse(JSON.stringify(tableDefinition)) as TableDefinition) || null;
  }

  public get tableDefinition(): TableDefinition | null {
    return this._tableDefinition;
  }

  @Input()
  public dropdownPosition: NzPlacementType = 'bottomRight';

  @Output()
  public applyColumnChanges: EventEmitter<TableDefinition | null> = new EventEmitter<TableDefinition | null>();

  @Output()
  public resetColumnChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

  public onDropColumn(event: CdkDragDrop<ColumnDefinition[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  public apply(tableDefinition: TableDefinition | null): void {
    this.applyColumnChanges.emit(tableDefinition);
  }

  public reset(): void {
    this.resetColumnChanges.emit(true);
  }
}
