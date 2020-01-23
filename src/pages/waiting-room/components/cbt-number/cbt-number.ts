import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'cbt-number',
  templateUrl: 'cbt-number.html',
})

export class CBTNumberComponent implements OnChanges {

  @Input()
  cbtNumber: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  cbtNumberChange = new EventEmitter<string>();

  formControl: FormControl;
  static readonly fieldName: string = 'cbtNumber';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl(CBTNumberComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.cbtNumber);
  }

  cbtNumberChanged(cbtNumber: string): void {
    this.cbtNumberChange.emit(cbtNumber);
  }

  invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
