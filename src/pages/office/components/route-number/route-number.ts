import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'route-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'route-number.html',
})
export class RouteNumberComponent implements OnChanges {

  @Input()
  routeNumber: number;

  @Input()
  form: FormGroup;

  @Output()
  routeNumberChange = new EventEmitter<number>();

  routeNumberChanged(routeNumber: string): void {
    this.routeNumberChange.emit(Number.parseInt(routeNumber, 10));
  }

  ngOnChanges(): void {
    this.form.controls['routeNumber'].patchValue(this.routeNumber);
  }

  get invalid(): boolean {
    const ctrl = this.form.controls['routeNumber'];
    const valid = ctrl.valid;
    const dirty = ctrl.dirty;
    console.log(`valid: ${valid} | dirty: ${dirty}`);
    return !valid && dirty;
  }

}
