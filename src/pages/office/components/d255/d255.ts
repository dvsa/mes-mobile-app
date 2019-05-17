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

    this.formControl.patchValue(this.getD255OrDefault());
  }

  d255Changed(d255FormValue: string): void {
    if (this.formControl.valid) {
      this.d255Change.emit(d255FormValue === 'Yes' ? true : false);
    }
  }

  getD255OrDefault(): string | null {
    if (this.d255 === null) {
      if (this.outcomeBehaviourProvider.hasDefault(this.outcome, 'd255')) {
        const defaultValue = this.outcomeBehaviourProvider.getDefault(this.outcome, 'd255');
        this.d255Changed(defaultValue);
        return defaultValue;
      }
      return null;
    }
    return this.d255 ? 'Yes' : 'No';
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
