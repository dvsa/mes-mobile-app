import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  ProvisionalLicenseReceived,
  ProvisionalLicenseNotReceived,
} from
  '../../../../modules/tests/pass-completion/pass-completion.actions';

@Component({
  selector: 'license-provided',
  templateUrl: 'license-provided.html',
})

export class LicenseProvidedComponent implements OnChanges {

  @Output()
  licenseReceived = new EventEmitter<ProvisionalLicenseReceived>();

  @Output()
  licenseNotReceived = new EventEmitter<ProvisionalLicenseNotReceived>();

  @Input()
  form: FormGroup;

  formControl: FormControl;
  static readonly fieldName: string = 'provisionalLicenseProvidedCtrl';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.form.addControl(LicenseProvidedComponent.fieldName, this.formControl);
    }
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  provisionalLicenseReceived(): void {
    this.licenseReceived.emit();
  }

  provisionalLicenseNotReceived(): void {
    this.licenseNotReceived.emit();
  }
}
