import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeQuerySearchFilterComponent } from './date-range-query-search-filter.component';

describe('DateRangeQuerySearchFilterComponent', () => {
  let component: DateRangeQuerySearchFilterComponent;
  let fixture: ComponentFixture<DateRangeQuerySearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRangeQuerySearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeQuerySearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
