import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'eyesight-test',
  templateUrl: 'eyesight-test.html',
})
export class EyesightTestComponent implements OnChanges {

  @Input()
  testState: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  eyesightTestResultChange = new EventEmitter<string>();

  formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl  = new FormControl('', [Validators.required]);
      this.formGroup.addControl('eyesightCtrl', this.formControl);
    }
    this.formControl.patchValue(this.testState);
  }
  eyesightTestResultChanged(result: string): void {
    if (this.formControl.valid) {
      this.eyesightTestResultChange.emit(result);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  get testPassed(): boolean {
    return this.testState === 'P';
  }
  get testFailed(): boolean {
    return this.testState === 'F';
  }

}
