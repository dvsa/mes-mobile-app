import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ShowMeQuestion } from '../../../../../providers/question/show-me-question.model';

@Component({
  selector: 'vehicle-checks-question',
  templateUrl: 'vehicle-checks-question.html',
})
export class VehicleChecksQuestionComponent implements OnChanges {

  @Input()
  vehicleChecksQuestionModel: ShowMeQuestion;

  @Input()
  vehicleChecksQuestionOptions: ShowMeQuestion[];

  @Input()
  formGroup: FormGroup;

  @Input()
  disabled: boolean;

  @Output()
  vehicleChecksQuestionChange = new EventEmitter<ShowMeQuestion>();

  private formControl: FormControl;
  static readonly fieldName: string = 'vehicleChecksQuestion';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({ disabled: true });
      this.formGroup.addControl(VehicleChecksQuestionComponent.fieldName, this.formControl);
    }
    this.formControl.patchValue(this.vehicleChecksQuestionModel);
  }

  vehicleChecksQuestionChanged(vehicleChecksQuestion: ShowMeQuestion): void {
    this.vehicleChecksQuestionChange.emit(vehicleChecksQuestion);
  }

  // tslint:disable-next-line: variable-name
  isOptionDisabled(_vehicleChecksQuestion: ShowMeQuestion): boolean {
    return false;
  }
}
