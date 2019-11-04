import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';

@Component({
  selector: 'vehicle-checks-question',
  templateUrl: 'vehicle-checks-question.html',
})
export class VehicleChecksQuestionComponent implements OnChanges {

  // TODO - need to type from VehicleTypes API Definitions
  @Input()
  selectedQuestion: any;

  @Input()
  questions: VehicleChecksQuestion[];

  @Input()
  formGroup: FormGroup;

  @Input()
  disabled: boolean;

  @Output()
  vehicleChecksQuestionChange = new EventEmitter<any>();

  private formControl: FormControl;
  static readonly fieldName: string = 'vehicleChecksQuestion';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({ disabled: true });
      this.formGroup.addControl(VehicleChecksQuestionComponent.fieldName, this.formControl);
    }
    // TODO - fix once type is in from api definitions
    this.formControl.patchValue(this.selectedQuestion);
  }

    // TODO - need to type from VehicleTypes API Definitions
  vehicleChecksQuestionChanged(vehicleChecksQuestion: any): void {
    this.vehicleChecksQuestionChange.emit(vehicleChecksQuestion);
  }
}
