import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TerminationCode } from './termination-code.constants';
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';

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
    if (this.formControl.valid) {
      this.terminationCodeChange.emit(terminationCode);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  isSelectDisabled(): boolean {
    if (this.terminationCode && this.terminationCode.activityCode === ActivityCodes.FAIL_EYESIGHT) {
      return true;
    }
    return false;
  }

  isOptionDisabled(activityCode: ActivityCode): boolean {
    if (
      activityCode === ActivityCodes.PASS ||
      activityCode === ActivityCodes.FAIL ||
      activityCode === ActivityCodes.FAIL_CANDIDATE_STOPS_TEST ||
      activityCode === ActivityCodes.FAIL_PUBLIC_SAFETY ||
      activityCode === ActivityCodes.FAIL_EYESIGHT
      ) {
      return true;
    }
    return false;
  }
}
