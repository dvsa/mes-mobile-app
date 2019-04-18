import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'route-number',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'route-number.html',
})
export class RouteNumberComponent implements OnInit, OnChanges {

  @Input()
  routeNumber: number;

  @Input()
  formGroup: FormGroup;

  @Output()
  routeNumberChange = new EventEmitter<number>();

  private formControlName = 'routeNumber';

  ngOnInit(): void {
    this.formGroup.addControl(this.formControlName, new FormControl(null, [Validators.required]));
  }

  private get formControl(): FormControl {
    return this.formGroup.controls[this.formControlName] as FormControl;
  }

  routeNumberChanged(routeNumber: string): void {
    this.routeNumberChange.emit(Number.parseInt(routeNumber, 10));
  }

  ngOnChanges(): void {
    if (this.formControl) {
      this.formControl.patchValue(this.routeNumber);
    }
  }

  get invalid(): boolean {
    const ctrl = this.formControl;
    const valid = ctrl.valid;
    const dirty = ctrl.dirty;
    console.log(`valid: ${valid} | dirty: ${dirty}`);
    return !valid && dirty;
  }

}
