import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';

@Component({
  selector: 'transmission',
  templateUrl: 'transmission.html',
})
export class TransmissionComponent {

  @Input()
  form: FormGroup;

  @Output()
  formControl: any;

  @Output()
  gearBoxCategoryChange = new EventEmitter<GearboxCategory>();


  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.form.addControl('transmissionCtrl', this.formControl);
    }
  }
  
  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  transmissionChanged(transmission: GearboxCategory): void {
    this.gearBoxCategoryChange.emit(transmission);
  }

}
