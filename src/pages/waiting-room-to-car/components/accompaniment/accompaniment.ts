import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';

@Component({
  selector: 'accompaniment',
  templateUrl: 'accompaniment.html',
})
export class TransmissionComponent implements OnChanges {

  @Input()
  instructorAccompaniment: boolean;
  @Input()
  superVisorAccompaniment: boolean;
  @Input()
  otherAccompaniment: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  instructorAccompanimentChange = new EventEmitter<boolean>();
  @Output()
  superVisorAccompanimentChange = new EventEmitter<boolean>();
  @Output()
  otherAccompanimentChange = new EventEmitter<boolean>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('Transmission', [Validators.required]);
      this.formGroup.addControl('accompaniment', this.formControl);
    }
//    this.formControl.patchValue(this.accompaniment);
  }

  accompanimentChanged(accompaniment: GearboxCategory): void {
    if (this.formControl.valid) {
//      this.accompanimentChange.emit(accompaniment);
    }
  }

}
