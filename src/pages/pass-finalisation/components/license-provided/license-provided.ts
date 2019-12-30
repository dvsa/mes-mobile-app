import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProvisionalLicenseReceived, ProvisionalLicenseNotReceived } from
  '../../../../modules/tests/pass-completion/pass-completion.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

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

  @Input()
  category: TestCategory;

  formControl: FormControl;
  static readonly fieldName: string = 'provisionalLicenseProvidedCtrl';
  askCandidateLicenseMessage: string = `Check that the candidate doesn't need their driving license`;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.form.addControl(LicenseProvidedComponent.fieldName, this.formControl);
    }
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  shouldHideBanner(): boolean {
    return (
      !this.formControl.valid
    );
  }

  shouldShowCandidateDoesntNeedLicenseBanner(): boolean {
    if (!this.shouldHideBanner()) {
      switch (this.category) {
        case TestCategory.C:
          return this.form.get(LicenseProvidedComponent.fieldName).value === 'yes';
      }
    }
    return false;
  }

  provisionalLicenseReceived(): void {
    this.licenseReceived.emit();
  }

  provisionalLicenseNotReceived(): void {
    this.licenseNotReceived.emit();
  }
}
