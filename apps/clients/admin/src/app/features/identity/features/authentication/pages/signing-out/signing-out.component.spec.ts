import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningOutComponent } from './signing-out.component';

describe('SigningOutComponent', () => {
  let component: SigningOutComponent;
  let fixture: ComponentFixture<SigningOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigningOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigningOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
