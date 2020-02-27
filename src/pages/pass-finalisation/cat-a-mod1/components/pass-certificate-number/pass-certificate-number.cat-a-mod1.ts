import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  PASS_CERTIFICATE_LENGTH_A_MOD1,
} from '../../../../../providers/pass-certificate-validation/pass-certificate-validation.constants';
import { PASS_CERTIFICATE_NUMBER_CTRL } from './pass-certificate-number.cat-a-mod1.constants';

@Component({
  selector: 'pass-certificate-number-cat-a-mod1',
  templateUrl: 'pass-certificate-number.cat-a-mod1.html',
})
export class PassCertificateNumberCatAMod1Component implements OnChanges {

  @Input()
  passCertificateNumberInput: String;

  @Input()
  form: FormGroup;

  @Output()
  passCertificateNumberChange = new EventEmitter<string>();

  formControl: FormControl;
  static readonly fieldName: string = PASS_CERTIFICATE_NUMBER_CTRL;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [
        Validators.maxLength(PASS_CERTIFICATE_LENGTH_A_MOD1),
        Validators.minLength(PASS_CERTIFICATE_LENGTH_A_MOD1),
        Validators.required,
      ]);
      this.form.addControl(PassCertificateNumberCatAMod1Component.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.passCertificateNumberInput);
  }

  passCertificateNumberChanged(passCertificateNumber: string): void {
    this.passCertificateNumberChange.emit(passCertificateNumber);
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
