import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Identification } from '@dvsa/mes-test-schema/categories/B';
import { OutcomeBehaviourMapProvider } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

@Component({
  selector: 'identification',
  templateUrl: 'identification.html',
})
export class IdentificationComponent implements OnChanges {
  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  identification: Identification;

  @Input()
  formGroup: FormGroup;

  @Output()
  identificationChange = new EventEmitter<Identification>();

  private formControl: FormControl;
  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('Licence');
      this.formGroup.addControl('identification', this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, 'identification');

    if (visibilityType === 'N') {
      this.formGroup.get('identification').clearValidators();
    } else {
      this.formGroup.get('identification').setValidators([Validators.required]);
    }
    this.formControl.patchValue(this.identification);
  }

  identificationChanged(identification: Identification): void {
    if (this.formControl.valid) {
      this.identificationChange.emit(identification);
    }
  }

}
