import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'provided-email',
  templateUrl: 'provided-email.html',
})
export class ProvidedEmailComponent {

  static readonly providedEmail: string = 'Email';
  static readonly radioCtrl: string = 'radioCtrl';

  @Input()
  formGroup: FormGroup;

  @Input()
  providedEmailAddress: string;

  @Input()
  shouldRender: boolean;

  @Input()
  providedEmailAddressChosen: boolean;

  @Input()
  providedEmailRadioValue: boolean;

  @Output()
  providedEmailRadioSelect = new EventEmitter<string>();

  private radioControl: FormControl;

  ngOnChanges() {
    if (!this.radioControl) {
      this.radioControl = new FormControl('', [Validators.required]);
      this.formGroup.addControl(ProvidedEmailComponent.radioCtrl, this.radioControl);
    }
    this.radioControl.patchValue(this.providedEmailRadioValue ? true : false);

  }

  providedEmailRadioSelected() {
    this.providedEmailRadioSelect.emit(ProvidedEmailComponent.providedEmail);
  }
}
