import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pass-certificate-declaration',
  templateUrl: 'pass-certificate-declaration.html',
})
export class PassCertificateDeclarationComponent implements OnChanges {

  @Output()
  passCertificateDeclarationChange = new EventEmitter<boolean>();

  @Input()
  formGroup: FormGroup;

  @Input()
  label: string;

  @Input()
  passCertificateNumberReceived: boolean;

  formControl: FormControl;

  static readonly fieldName: string = 'passCertificateDeclarationCtrl';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl(PassCertificateDeclarationComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.passCertificateNumberReceived);
  }

  passCertificateDeclarationChanged(passCertificate: boolean) {
    this.passCertificateDeclarationChange.emit(passCertificate);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
