import { Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'pass-certificate-number',
  templateUrl: 'pass-certificate-number.html',
})
export class PassCertificateNumberComponent implements OnChanges {

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
      this.formControl = new FormControl(null, [Validators.maxLength(8), Validators.minLength(8), Validators.required]);
      this.form.addControl(PassCertificateNumberComponent.fieldName, this.formControl);
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
