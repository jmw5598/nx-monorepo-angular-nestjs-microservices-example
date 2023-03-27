import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicQuerySearchFilterComponent } from './basic-query-search-filter.component';

describe('BasicQuerySearchFilterComponent', () => {
  let component: BasicQuerySearchFilterComponent;
  let fixture: ComponentFixture<BasicQuerySearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicQuerySearchFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicQuerySearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
