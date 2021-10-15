import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivityCodeModel } from './activity-code.constants';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'activity-code',
  templateUrl: 'activity-code.html',
})
export class ActivityCodeComponent implements OnChanges {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  @Input()
  activityCodeModel: ActivityCodeModel;

  @Input()
  activityCodeOptions: ActivityCodeModel[];

  @Input()
  formGroup: FormGroup;

  @Input()
  disabled: boolean;

  @Input()
  allowAllCodes: boolean = false;

  @Output()
  activityCodeChange = new EventEmitter<ActivityCodeModel>();

  @Output()
  activityCodeSelectOpened = new EventEmitter();

  private formControl: FormControl;
  static readonly fieldName: string = 'activityCode';

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({ disabled: true }, [Validators.required]);
      this.formGroup.addControl(ActivityCodeComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.activityCodeModel);
  }

  activityCodeChanged(activityCode: ActivityCodeModel): void {
    if (this.formControl.valid) {
      this.activityCodeChange.emit(activityCode);
    }
  }

  activitySelectOpened(): void {
    this.activityCodeSelectOpened.emit();
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  isSelectDisabled(): boolean {
    if (this.allowAllCodes) {
      return false;
    }
    return this.disabled || (this.activityCodeModel && parseInt(this.activityCodeModel.activityCode, 10) < 4);
  }

  isOptionDisabled(activityCode: ActivityCode): boolean {
    if (this.allowAllCodes) {
      return false;
    }

    if (parseInt(activityCode, 10) < 4) {
      return true;
    }
    return false;
  }
}
