import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VspDatatableWidgetColumnEditorComponent } from './datatable-widget-column-editor.component';

describe('VspDatatableWidgetColumnEditorComponent', () => {
  let component: VspDatatableWidgetColumnEditorComponent;
  let fixture: ComponentFixture<VspDatatableWidgetColumnEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VspDatatableWidgetColumnEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VspDatatableWidgetColumnEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
