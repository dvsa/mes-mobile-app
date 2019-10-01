import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'insurance-declaration',
  templateUrl: 'insurance-declaration.html',
})
export class InsuranceDeclarationComponent implements OnChanges {

  @Input()
  selected: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  insuranceDeclarationChange = new EventEmitter();

  formControl: FormControl;
  static readonly fieldName: string = 'insuranceCheckbox';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.requiredTrue]),

      this.formGroup.addControl(InsuranceDeclarationComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.selected);
  }

  insuranceDeclarationChanged(): void {
    this.insuranceDeclarationChange.emit();
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
