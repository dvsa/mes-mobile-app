import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { isNumber } from 'util';

@Component({
  selector: 'route-number',
  templateUrl: 'route-number.html',
})
export class RouteNumberComponent implements OnChanges {

  @Input()
  display: boolean;

  @Input()
  routeNumber: number;

  @Input()
  formGroup: FormGroup;

  @Output()
  routeNumberChange = new EventEmitter<number>();

  private formControl: FormControl;

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) {}

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('routeNumber', this.formControl);
    }

    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType('1', 'routeNumber');

    if (visibilityType === 'N') {
      // turn off required validation
      // if we have multiple validators will need to set the ones we need
      this.formGroup.get('routeNumber').clearValidators();
    } else {
      this.formGroup.get('routeNumber').setValidators([Validators.required]);
    }
    this.formControl.patchValue(this.routeNumber);
  }

  routeNumberChanged(routeNumber: string): void {
    if (this.formControl.valid) {
      if (isNumber(routeNumber)) {
        this.routeNumberChange.emit(Number.parseInt(routeNumber, 10));
      }
    }
  }

  get invalid() : boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
