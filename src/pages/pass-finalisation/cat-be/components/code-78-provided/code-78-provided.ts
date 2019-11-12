import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'code-78-provided',
  templateUrl: 'code-78-provided.html',
})

export class Code78ProvidedComponent implements OnChanges{
  @Input()
  form: FormGroup;

  formControl: FormControl;
  static readonly fieldName: string = 'code78ProvidedCtrl';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('', [Validators.required]);
      this.form.addControl(Code78ProvidedComponent.fieldName, this.formControl);
    }
  }

  isInvalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
