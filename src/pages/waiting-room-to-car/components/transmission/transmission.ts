import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';

@Component({
  selector: 'transmission',
  templateUrl: 'transmission.html',
})
export class TransmissionComponent implements OnChanges {

  @Input()
  transmission: GearboxCategory;

  @Input()
  formGroup: FormGroup;

  @Output()
  transmissionChange = new EventEmitter<GearboxCategory>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('Transmission', [Validators.required]);
      this.formGroup.addControl('transmission', this.formControl);
    }
    this.formControl.patchValue(this.transmission);
  }

  transmissionChanged(transmission: GearboxCategory): void {
    if (this.formControl.valid) {
      this.transmissionChange.emit(transmission);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
