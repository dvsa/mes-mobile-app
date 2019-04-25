import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IndependentDriving } from '@dvsa/mes-test-schema/categories/B';

@Component({
  selector: 'independent-driving',
  templateUrl: 'independent-driving.html',
})
export class IndependentDrivingComponent implements OnChanges {

  @Input()
  independentDriving: IndependentDriving;

  @Input()
  formGroup: FormGroup;

  @Output()
  independentDrivingChange = new EventEmitter<IndependentDriving>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl('independentDriving', this.formControl);
    }
    this.formControl.patchValue(this.independentDriving);
  }

  independentDrivingChanged(independentDriving: IndependentDriving): void {
    if (this.formControl.valid) {
      this.independentDrivingChange.emit(independentDriving);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
