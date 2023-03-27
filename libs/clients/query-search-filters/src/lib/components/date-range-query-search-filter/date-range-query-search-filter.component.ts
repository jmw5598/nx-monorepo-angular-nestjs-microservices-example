import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { DateRangeQuerySearchFilter } from '../../models/date-range-query-search-filter.model';

@Component({
  selector: 'vsp-date-range-query-search-filter',
  templateUrl: './date-range-query-search-filter.component.html',
  styleUrls: ['./date-range-query-search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzDatePickerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    ReactiveFormsModule,
  ]
})
export class DateRangeQuerySearchFilterComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<any> = new Subject<any>();

  @Input()
  public set filter(filter: DateRangeQuerySearchFilter | null) {
    if (filter) {
      this.form.patchValue({ 
        query: filter?.query || null,
        startDate: filter?.startDate ? new Date(Date.parse(filter.startDate || '')) : null,
        endDate: filter?.endDate ? new Date(Date.parse(filter?.endDate || '')) : null
      }, { emitEvent: false });
    }
  }

  @Input()
  public debounceTime: number = 500;

  @Input()
  public startDateLabel: string = 'Start Date';

  @Input()
  public endDateLabel: string = 'End Date';

  @Input()
  public dateFormat: string = 'MM/dd/yyyy';

  @Output()
  public searchChange: EventEmitter<DateRangeQuerySearchFilter> = new EventEmitter<DateRangeQuerySearchFilter>();

  public form: UntypedFormGroup = new UntypedFormGroup({
    query: new UntypedFormControl(''),
    startDate: new UntypedFormControl(null),
    endDate: new UntypedFormControl(null)
  });

  ngOnInit(): void {
    this._listenForSearchQueryChanges();
  }

  public onSearch(filterForm: any): void {
    const filter: DateRangeQuerySearchFilter = this._formValueToSearchFilter(filterForm);
    this.searchChange.emit(filter);
  }

  public onDateRangeChange(dates: any): void {
    console.log('dates are ', dates);
  }

  private _listenForSearchQueryChanges(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this._subscriptionSubject),
        distinctUntilChanged(),
        debounceTime(this.debounceTime)
      )
      .subscribe((filterForm: any) => {
        const filter: DateRangeQuerySearchFilter = this._formValueToSearchFilter(filterForm);
        this.searchChange.emit(filter)
      });
  }

  private _formValueToSearchFilter(formValue: any): DateRangeQuerySearchFilter {
    return {
      query: formValue.query,
      startDate: formValue.startDate ? (formValue.startDate as Date).toISOString() : '',
      endDate: formValue.endDate ? (formValue.endDate as Date).toISOString() : ''
    } as DateRangeQuerySearchFilter;
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next(null);
    this._subscriptionSubject.complete();
  }
}
