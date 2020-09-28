import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'health-declaration-signed',
  templateUrl: 'health-declaration-signed.html',
})
export class HealthDeclarationSignedComponent implements OnChanges {

  @Input()
  healthDeclaration: boolean;

  @Input()
  formGroup: FormGroup;

  @Input()
  label: string;

  @Output()
  healthDeclarationChange = new EventEmitter<boolean>();

  formControl: FormControl;
  static readonly fieldName: string = 'healthDeclarationCtrl';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null, [Validators.required]);
      this.formGroup.addControl(HealthDeclarationSignedComponent.fieldName, this.formControl);

      // set to null on form creation to allow validation to fire if no user interaction
      if (!this.healthDeclaration) this.healthDeclaration = null;
    }
    this.formControl.patchValue(this.healthDeclaration);
  }

  healthDeclarationChanged(health: boolean): void {
    this.healthDeclarationChange.emit(health);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
