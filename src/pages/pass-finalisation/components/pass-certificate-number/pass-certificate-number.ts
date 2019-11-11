import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  PassCertificateValidatorProvider,
} from '../../../../providers/pass-certificate-validator/pass-certificate-validator';

@Component({
  selector: 'pass-certificate-number',
  templateUrl: 'pass-certificate-number.html',
})
export class PassCertificateNumberComponent implements OnChanges {

  passCertficateValidatorProvider: PassCertificateValidatorProvider;

  constructor(passCertficateValidatorProvider: PassCertificateValidatorProvider) {
    this.passCertficateValidatorProvider = passCertficateValidatorProvider;
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
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.required,
        this.validatePassCertificate.bind(this)]);
      this.form.addControl(PassCertificateNumberComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.passCertificateNumberInput);
  }
    // Custom validator for FormControls
  validatePassCertificate(c: FormControl) {
    return this.passCertficateValidatorProvider.isPassCertificateValid(c.value) ? null :
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
