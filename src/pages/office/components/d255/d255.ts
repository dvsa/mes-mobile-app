import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'd255',
  templateUrl: 'd255.html',
})
export class D255Component implements OnChanges {

  @Input()
  d255: boolean;

  @Input()
  formGroup: FormGroup;

  @Output()
  d255Change = new EventEmitter<boolean>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl('d255', this.formControl);
    }
    if (this.d255 !== null) {
      this.formControl.patchValue(this.d255 ? 'Yes' : 'No');
    }
  }

  d255Changed(d255FormValue: string): void {
    if (this.formControl.valid) {
      this.d255Change.emit(d255FormValue === 'Yes' ? true : false);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
