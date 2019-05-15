import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

@Component({
  selector: 'd255',
  templateUrl: 'd255.html',
})
export class D255Component implements OnChanges {
  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  d255: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  d255Change = new EventEmitter<boolean>();

  private formControl: FormControl;

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl('d255', this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, 'd255');

    if (visibilityType === 'N') {
      this.formGroup.get('d255').clearValidators();
    } else {
      this.formGroup.get('d255').setValidators([Validators.required]);
    }

    if (this.d255 !== null) {
      this.formControl.patchValue(this.d255 ? 'Yes' : 'No');
    } else {
      this.formControl.patchValue(null);
    }
  }

  d255Changed(d255FormValue: string): void {
    if (this.formControl.valid) {
      this.d255Change.emit(d255FormValue === 'Yes' ? true : false);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
