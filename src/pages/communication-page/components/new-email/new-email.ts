import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'new-email',
  templateUrl: 'new-email.html',
})
export class NewEmailComponent implements OnChanges {

  readonly newEmail = 'newEmail';
  readonly newEmailCtrl = 'newEmailCtrl';

  @Input()
  formGroup: FormGroup;

  @Input()
  newEmailAddress: string;

  @Input()
  newEmailAddressChosen: boolean;

  @Output()
  newEmailRadioSelect = new EventEmitter<string>();

  @Output()
  newEmailTextChange = new EventEmitter<string>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.email]);
      this.formGroup.addControl(this.newEmailCtrl, this.formControl);
    }
    this.formControl.patchValue(this.newEmailCtrl);
  }

  newEmailRadioSelected() {
    this.newEmailRadioSelect.emit(this.newEmail);
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
