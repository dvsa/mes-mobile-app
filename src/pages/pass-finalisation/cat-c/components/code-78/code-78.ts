import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TransmissionType } from '../../../../../shared/models/transmission-type';

@Component({
  selector: 'code-78',
  templateUrl: 'code-78.html',
})

export class Code78Component implements OnChanges {
  @Input()
  form: FormGroup;

  @Input()
  category: TestCategory;

  @Input()
  transmission: TransmissionType;

  @Output()
  code78Present = new EventEmitter<boolean>();

  formControl: FormControl;
  static readonly fieldName: string = 'code78Ctrl';
  manualMessage: string = 'A <b><em>manual</em></b> licence will be issued';
  automaticMessage: string = 'An <b><em>automatic</em></b> licence will be issued';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.form.addControl(Code78Component.fieldName, this.formControl);
    }
  }

  shouldHideBanner(): boolean {
    return (
      !this.formControl.valid || !this.transmission
    );
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  shouldShowManualBanner(): boolean {
    if (!this.shouldHideBanner()) {
      switch (this.category) {
        case TestCategory.C:
          return this.transmission === TransmissionType.Manual ||
            (this.transmission === TransmissionType.Automatic
              && this.form.get(Code78Component.fieldName).value === 'no');
      }
    }
    return false;
  }

  shouldShowAutomaticBanner(): boolean {
    if (!this.shouldHideBanner()) {
      switch (this.category) {
        case TestCategory.C:
          return this.transmission === TransmissionType.Automatic
            && this.form.get(Code78Component.fieldName).value === 'yes';
      }
    }
    return false;
  }

  code78IsPresent(): void {
    this.code78Present.emit(true);
  }

  code78IsNotPresent(): void {
    this.code78Present.emit(false);
  }
}
