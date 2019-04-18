import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'independent-driving',
  templateUrl: 'independent-driving.html',
})
export class IndependentDrivingComponent implements OnChanges {

  // TODO: This should be a proper type
  @Input()
  independentDrivingType: string;

  @Input()
  formGroup: FormGroup;

  // TODO: This should be a proper type
  @Output()
  independentDrivingChange = new EventEmitter<string>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, Validators.required);
      this.formGroup.addControl('independentDriving', this.formControl);
    }
    this.formControl.patchValue(this.independentDrivingType);
  }

  // TODO: This should be a proper type
  independentDrivingChanged(independentDrivingStyle: string) {
    this.independentDrivingChange.emit(independentDrivingStyle);
  }

}
