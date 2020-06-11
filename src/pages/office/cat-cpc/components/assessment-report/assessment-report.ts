import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'assessment-report',
  templateUrl: 'assessment-report.html',
})
export class AssessmentReportComponent implements OnChanges {
  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  assessmentReport: string;

  @Input()
  formGroup: FormGroup;

  @Output()
  assessmentReportChange = new EventEmitter<string>();

  private formControl: FormControl;
  static readonly fieldName: string = 'assessmentReport';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl(null);
      this.formGroup.addControl(AssessmentReportComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.assessmentReport);
  }

  assessmentReportChanged(assessmentReport: string): void {
    this.assessmentReportChange.emit(assessmentReport);
  }

}
