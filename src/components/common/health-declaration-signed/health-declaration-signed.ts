import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import {
//   OutcomeBehaviourMapProvider,
//   VisibilityType,
// } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';

// enum HealthDeclarationValues {
//   SIGNED = 'true',
//   NOTSIGNED = 'false',
// }

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
  outcome: string;

  @Output()
  healthDeclarationChange = new EventEmitter<boolean>();

  formControl: FormControl;
  static readonly fieldName: string = 'healthDeclarationCtrl';
  // constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('HealthDec', [Validators.required]);
      this.formGroup.addControl(HealthDeclarationSignedComponent.fieldName, this.formControl);
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
