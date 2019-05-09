import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TerminationCode } from './termination-code.constants';

@Component({
  selector: 'termination-code',
  templateUrl: 'termination-code.html',
})
export class TerminationCodeComponent implements OnChanges {

  @Input()
  terminationCode: TerminationCode;

  @Input()
  terminationCodeOptions: TerminationCode[];

  @Input()
  formGroup: FormGroup;

  @Output()
  terminationCodeChange = new EventEmitter<any>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl([], [Validators.required]);
      this.formGroup.addControl('terminationCode', this.formControl);
    }
    this.formControl.patchValue(this.terminationCode);
  }

  terminationCodeChanged(terminationCode: TerminationCode): void {
    this.terminationCodeChange.emit(terminationCode);
    if (this.formControl.valid) {
      this.terminationCodeChange.emit(terminationCode);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
