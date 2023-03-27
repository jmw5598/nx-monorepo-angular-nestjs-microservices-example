import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'input[vspAutoFocusControl],textarea[vspAutoFocusControl]',
  standalone: true,
})
export class VspAutoFocusControlDirective implements AfterViewInit {
  private readonly _elementRef: ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    this.setFocusToControl();
  }

  public setFocusToControl(): void {
    setTimeout(() => this._elementRef.nativeElement.focus());
  }
}
