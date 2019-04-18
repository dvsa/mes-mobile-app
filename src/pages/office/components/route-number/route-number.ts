import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'route-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'route-number.html',
})
export class RouteNumberComponent implements OnChanges {

  @Input()
  routeNumber: number;

  @Input()
  formGroup: FormGroup;

  @Output()
  routeNumberChange = new EventEmitter<number>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl('routeNumber', this.formControl);
    }
    this.formControl.patchValue(this.routeNumber);
  }

  routeNumberChanged(routeNumber: string): void {
    this.routeNumberChange.emit(Number.parseInt(routeNumber, 10));
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
