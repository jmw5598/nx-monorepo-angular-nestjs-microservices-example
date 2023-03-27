import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicQuerySearchWithDeletedFilterComponent } from './basic-query-search-with-deleted-filter.component';

describe('BasicQuerySearchWithDeletedFilterComponent', () => {
  let component: BasicQuerySearchWithDeletedFilterComponent;
  let fixture: ComponentFixture<BasicQuerySearchWithDeletedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicQuerySearchWithDeletedFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicQuerySearchWithDeletedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
