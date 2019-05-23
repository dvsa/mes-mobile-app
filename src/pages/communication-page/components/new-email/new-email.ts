import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'new-email',
  templateUrl: 'new-email.html',
})
export class NewEmailComponent implements OnChanges {

  static readonly newEmail: string = 'newEmail';
  static readonly newEmailCtrl: string = 'newEmailCtrl';
  static readonly radioCtrl: string = 'radioCtrl';

  @Input()
  formGroup: FormGroup;

  @Input()
  newEmailAddress: string;

  @Input()
  newEmailAddressChosen: boolean;

  @Input()
  newEmailRadioValue: boolean;

  @Output()
  newEmailRadioSelect = new EventEmitter<string>();

  @Output()
  newEmailTextChange = new EventEmitter<string>();

  formControl: FormControl;
  radioFormControl: FormControl;

  ngOnChanges(): void {
    if (!this.radioFormControl) {
      this.radioFormControl = new FormControl('', [Validators.required]);
      this.formGroup.addControl(NewEmailComponent.radioCtrl, this.radioFormControl);
    }

    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.email]);
      this.formGroup.addControl(NewEmailComponent.newEmailCtrl, this.formControl);
    }

    this.formControl.patchValue(this.newEmailAddress);
    this.radioFormControl.patchValue(this.newEmailRadioValue ? true : false);
  }

  newEmailRadioSelected() {
    this.newEmailRadioSelect.emit(NewEmailComponent.newEmail);
  }

  newEmailTextChanged(email: string) {
    if (this.formControl.valid) {
      this.newEmailTextChange.emit(email);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
