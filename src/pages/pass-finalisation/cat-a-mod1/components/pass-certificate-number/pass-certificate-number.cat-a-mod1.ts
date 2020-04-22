import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PASS_CERTIFICATE_NUMBER_CTRL } from './pass-certificate-number.cat-a-mod1.constants';
import {
  PASS_CERTIFICATE_LENGTH_A_MOD1,
} from '../../../../../providers/pass-certificate-validation/pass-certificate-validation.constants';
import {
  getByteCount,
  getPassCertificateAMOD1Validator,
} from '../../../../../shared/constants/field-validators/field-validators';
import { toUpper } from 'lodash';

@Component({
  selector: 'pass-certificate-number-cat-a-mod1',
  templateUrl: 'pass-certificate-number.cat-a-mod1.html',
})
export class PassCertificateNumberCatAMod1Component implements OnChanges {

  @Input()
  passCertificateNumberInput: string;

  @Input()
  form: FormGroup;

  @Output()
  passCertificateNumberChange = new EventEmitter<string>();

  formControl: FormControl;

  static readonly fieldName: string = PASS_CERTIFICATE_NUMBER_CTRL;

  readonly passCertificateAMOD1Validator = getPassCertificateAMOD1Validator();

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [
        Validators.maxLength(PASS_CERTIFICATE_LENGTH_A_MOD1),
        Validators.minLength(PASS_CERTIFICATE_LENGTH_A_MOD1),
        Validators.pattern(this.passCertificateAMOD1Validator.pattern),
        Validators.required,
      ]);
      this.form.addControl(PassCertificateNumberCatAMod1Component.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.passCertificateNumberInput);
  }

  passCertificateNumberChanged(passCertificateNumber: string): void {
    const actualLength: number = getByteCount(passCertificateNumber);
    const permittedLength: number = this.passCertificateAMOD1Validator.maxByteLength;
    const validFormat: boolean = this.passCertificateAMOD1Validator.pattern.test(passCertificateNumber);
    const invalidFormatErr = { invalidFormat: passCertificateNumber };

    if (actualLength > permittedLength) {
      const error = {
        actualLength,
        permittedLength,
      };
      this.formControl.setErrors(validFormat ? error : { ...error, ...invalidFormatErr });
    } else if (!validFormat) {
      this.formControl.setErrors(invalidFormatErr);
    }

    this.passCertificateNumberChange.emit(toUpper(passCertificateNumber));
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
