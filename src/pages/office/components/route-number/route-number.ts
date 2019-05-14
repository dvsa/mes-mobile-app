import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { StringType } from '../../../../shared/helpers/string-type';

@Component({
  selector: 'route-number',
  templateUrl: 'route-number.html',
})
export class RouteNumberComponent implements OnChanges {

  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  routeNumber: number;

  @Input()
  formGroup: FormGroup;

  @Output()
  routeNumberChange = new EventEmitter<number>();

  private formControl: FormControl;

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('routeNumber', this.formControl);
    }

    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, 'routeNumber');

    if (visibilityType === 'N') {
      this.formGroup.get('routeNumber').clearValidators();
    } else {
      this.formGroup.get('routeNumber').setValidators([Validators.required]);
    }
    this.formControl.patchValue(this.routeNumber);
  }

  routeNumberChanged(routeNumber: string): void {
    if (this.formControl.valid) {
      if (StringType.isNumeric(routeNumber)) {
        this.routeNumberChange.emit(Number.parseInt(routeNumber, 10));
      }
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
