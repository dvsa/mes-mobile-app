import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'transfer',
  templateUrl: 'transfer.html',
})
export class TransferComponent implements OnChanges {

  static readonly checkBoxCtrl: string = 'transferSelected';
  static readonly fieldName: string = 'staffNumber';

  @Input()
  selected: boolean;

  @Input()
  staffNumber: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  selectedChange = new EventEmitter<boolean>();

  @Output()
  staffNumberChange = new EventEmitter<string>();

  private checkBoxFormControl: FormControl;
  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.checkBoxFormControl) {
      this.checkBoxFormControl = new FormControl(null);
      this.formGroup.addControl(TransferComponent.checkBoxCtrl, this.checkBoxFormControl);
    }

    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl(TransferComponent.fieldName, this.formControl);
    }
    if (this.selected) {
      this.formGroup.get(TransferComponent.fieldName).setValidators([
        Validators.required]);
    } else {
      this.formGroup.get(TransferComponent.fieldName).clearValidators();
    }

    this.checkBoxFormControl.patchValue(this.selected ? true : false);
    this.formControl.patchValue(this.staffNumber);
  }

  selectedValueChanged(selected: boolean): void {
    if (!selected) {
      this.formGroup.get(TransferComponent.fieldName).reset();
    }
    this.selectedChange.emit(selected);
  }

  staffNumberValueChanged(staffNumber: string): void {
    this.staffNumberChange.emit(staffNumber);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  get empty(): boolean {
    return !this.formControl.value && this.formControl.dirty;
  }

}
