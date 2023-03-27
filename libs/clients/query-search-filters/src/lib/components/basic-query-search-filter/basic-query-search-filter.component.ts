import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { BasicQuerySearchFilter } from '../../models/basic-query-search-filter.model';

@Component({
  selector: 'vsp-basic-query-search-filter',
  templateUrl: './basic-query-search-filter.component.html',
  styleUrls: ['./basic-query-search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzButtonModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    ReactiveFormsModule,
  ]
})
export class BasicQuerySearchFilterComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<any> = new Subject<any>();

  @Input()
  public set filter(filter: BasicQuerySearchFilter | null) {
    if (filter) {
      this.form.patchValue({ ...filter }, { emitEvent: false });
    }
  }

  @Input()
  public debounceTime: number = 500;

  @Output()
  public searchChange: EventEmitter<BasicQuerySearchFilter> = new EventEmitter<BasicQuerySearchFilter>();

  public form: UntypedFormGroup = new UntypedFormGroup({
    query: new UntypedFormControl('')
  });
  
  ngOnInit(): void {
    this._listenForSearchQueryChanges();
  }

  public onSearch(filter: BasicQuerySearchFilter): void {
    this.searchChange.emit(filter);
  }

  private _listenForSearchQueryChanges(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this._subscriptionSubject),
        distinctUntilChanged(),
        debounceTime(this.debounceTime)
      )
      .subscribe((filter: BasicQuerySearchFilter) => this.searchChange.emit(filter));
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next(null);
    this._subscriptionSubject.complete();
  }
}
