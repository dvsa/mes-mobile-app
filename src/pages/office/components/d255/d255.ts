import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  OutcomeBehaviourMapProvider,
  VisibilityType,
} from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

enum ValidD255Values {
  YES = 'Yes',
  NO = 'No',
}

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
  private fieldName: string = 'd255';

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl(this.fieldName, this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, this.fieldName);

    if (visibilityType === VisibilityType.NotVisible) {
      this.formGroup.get(this.fieldName).clearValidators();
    } else {
      this.formGroup.get(this.fieldName).setValidators([Validators.required]);
    }

    this.formControl.patchValue(this.getD255OrDefault());
  }

  d255Changed(d255FormValue: string): void {
    if (this.formControl.valid) {
      this.d255Change.emit(d255FormValue === ValidD255Values.YES ? true : false);
    }
  }

  getD255OrDefault(): string | null {
    if (!this.d255) {
      if (this.outcomeBehaviourProvider.hasDefault(this.outcome, this.fieldName)) {
        const defaultValue = this.outcomeBehaviourProvider.getDefault(this.outcome, this.fieldName);
        this.d255Changed(defaultValue);
        return defaultValue;
      }
      return null;
    }
    return this.d255 ? ValidD255Values.YES : ValidD255Values.NO;
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
