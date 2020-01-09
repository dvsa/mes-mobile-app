import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransmissionType } from '../../../../../shared/models/transmission-type';

@Component({
  selector: 'code-78',
  templateUrl: 'code-78.html',
})

export class Code78Component implements OnChanges {
  @Input()
  form: FormGroup;

  @Input()
  transmission: TransmissionType;

  @Output()
  code78Present = new EventEmitter<boolean>();

  formControl: FormControl;
  static readonly fieldName: string = 'code78Ctrl';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.form.addControl(Code78Component.fieldName, this.formControl);
    }
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  code78IsPresent(): void {
    this.code78Present.emit(true);
  }

  code78IsNotPresent(): void {
    this.code78Present.emit(false);
  }
}
