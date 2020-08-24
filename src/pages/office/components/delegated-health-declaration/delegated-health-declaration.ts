import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export enum ValidHealthDeclarationValues {
  SIGNED = 'Signed',
  NOT_SIGNED = 'Not Signed',
}
@Component({
  selector: 'delegated-health-declaration',
  templateUrl: 'delegated-health-declaration.html',
})
export class DelegatedHealthDeclarationComponent implements OnChanges {

  @Input()
  healthDeclarationSigned: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  healthDeclarationChange = new EventEmitter<boolean>();

  static readonly fieldName: string = 'healthDeclaration';
  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl(DelegatedHealthDeclarationComponent.fieldName, this.formControl);
    }
    if (this.healthDeclarationSigned) {
      this.formControl.patchValue(ValidHealthDeclarationValues.SIGNED);
    } else {
      this.formControl.patchValue(ValidHealthDeclarationValues.NOT_SIGNED);
    }
  }

  healthDeclarationChanged(formValue: string): void {
    if (this.formControl.valid) {
      this.healthDeclarationChange.emit(formValue === ValidHealthDeclarationValues.SIGNED);
    }
  }

}
