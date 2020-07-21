import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'language-preferences',
  templateUrl: 'language-preferences.html',
})
export class LanguagePreferencesComponent implements OnChanges {

  @Input()
  isWelsh: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  welshChanged = new EventEmitter<boolean>();

  private formControl: FormControl;
  private formField: string = 'languagePreferences';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', Validators.required);
      this.formGroup.addControl(this.formField, this.formControl);
      this.formGroup.get(this.formField).setValidators([Validators.required]);
    }
    this.formControl.patchValue(this.isWelsh);
  }

  isWelshChanged(isWelsh: string): void {
    if (this.formControl.valid) {
      this.welshChanged.emit(isWelsh === 'true');
    }
  }

}
