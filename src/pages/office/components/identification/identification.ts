import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Identification } from '@dvsa/mes-test-schema/categories/B';

@Component({
  selector: 'identification',
  templateUrl: 'identification.html',
})
export class IdentificationComponent implements OnChanges {

  @Input()
  identification: Identification;

  @Input()
  formGroup: FormGroup;

  @Output()
  identificationChange = new EventEmitter<Identification>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('Licence', [Validators.required]);
      this.formGroup.addControl('identification', this.formControl);
    }
    this.formControl.patchValue(this.identification);
  }

  identificationChanged(identification: Identification): void {
    if (this.formControl.valid) {
      this.identificationChange.emit(identification);
    }
  }

}
