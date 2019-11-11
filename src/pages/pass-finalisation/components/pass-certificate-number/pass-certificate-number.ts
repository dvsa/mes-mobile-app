import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  PassCertificateValidationProvider,
} from '../../../../providers/pass-certificate-validation/pass-certificate-validation';
import {
  passCertificateLength,
} from '../../../../providers/pass-certificate-validation/pass-certificate-validation.constants';

@Component({
  selector: 'pass-certificate-number',
  templateUrl: 'pass-certificate-number.html',
})
export class PassCertificateNumberComponent implements OnChanges {

  constructor(private passCertficateValidationProvider: PassCertificateValidationProvider) {
  }

  @Input()
  passCertificateNumberInput: String;

  @Input()
  form: FormGroup;

  @Output()
  passCertificateNumberChange = new EventEmitter<string>();

  formControl: FormControl;
  static readonly fieldName: string = 'passCertificateNumberCtrl';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [
        Validators.maxLength(passCertificateLength),
        Validators.minLength(passCertificateLength),
        Validators.required,
        this.validatePassCertificate.bind(this)]);
      this.form.addControl(PassCertificateNumberComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.passCertificateNumberInput);
  }
  validatePassCertificate(c: FormControl) {
    return this.passCertficateValidationProvider.isPassCertificateValid(c.value) ? null :
      {
        validatePassCertificate: {
          valid: false,
        },
      };
  }

  passCertificateNumberChanged(passCertificateNumber: string): void {
    this.passCertificateNumberChange.emit(passCertificateNumber);
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
