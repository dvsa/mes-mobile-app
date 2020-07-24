import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivityCodeModel, ActivityCodeModelDelegatedExaminer } from './activity-code.constants';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'activity-code',
  templateUrl: 'activity-code.html',
})
export class ActivityCodeComponent implements OnChanges {

  @Input()
  activityCodeModel: ActivityCodeModel | ActivityCodeModelDelegatedExaminer;

  @Input()
  activityCodeOptions: ActivityCodeModel[];

  @Input()
  formGroup: FormGroup;

  @Input()
  disabled: boolean;

  @Output()
  activityCodeChange = new EventEmitter<ActivityCodeModel | ActivityCodeModelDelegatedExaminer>();

  private formControl: FormControl;
  static readonly fieldName: string = 'activityCode';

  ngOnInit(): void {
    console.log('activityCodeModel', this.activityCodeModel);
    console.log('formGroup', this.formGroup);
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({ disabled: true }, [Validators.required]);
      this.formGroup.addControl(ActivityCodeComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.activityCodeModel);
  }

  activityCodeChanged(activityCode: ActivityCodeModel | ActivityCodeModelDelegatedExaminer): void {
    console.log('change', activityCode);
    if (this.formControl.valid) {
      this.activityCodeChange.emit(activityCode);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  isSelectDisabled(): boolean {
    // return this.disabled || (this.activityCodeModel && parseInt(this.activityCodeModel.activityCode, 10) < 4);
    return false;
  }

  isOptionDisabled(activityCode: ActivityCode): boolean {
    if (parseInt(activityCode, 10) < 4) {
      return true;
    }
    return false;
  }
}
