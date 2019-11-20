import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'transmission',
  templateUrl: 'transmission.html',
})

export class TransmissionComponent implements OnChanges {

  @Input()
  form: FormGroup;

  formControl: FormControl;
  static readonly fieldName: string = 'transmissionCtrl';

  @Output()
  gearBoxCategoryChange = new EventEmitter<GearboxCategory>();

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.form.addControl(TransmissionComponent.fieldName, this.formControl);
    }
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  transmissionChanged(transmission: GearboxCategory): void {
    this.gearBoxCategoryChange.emit(transmission);
  }
  
}
