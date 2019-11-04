import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'vehicle-checks-question',
  templateUrl: 'vehicle-checks-question.html',
})
export class VehicleChecksQuestionComponent implements OnChanges {

  @Input()
  questionResult: QuestionResult;

  @Input()
  questions: VehicleChecksQuestion[];

  @Input()
  questionsToDisable: VehicleChecksQuestion[];

  @Input()
  formGroup: FormGroup;

  @Input()
  disabled: boolean;

  @Output()
  vehicleChecksQuestionChange = new EventEmitter<QuestionResult>();

  private formControl: FormControl;
  static readonly fieldName: string = 'vehicleChecksQuestion';

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({ disabled: true });
      this.formGroup.addControl(VehicleChecksQuestionComponent.fieldName, this.formControl);
    }

    if (this.questionResult) {
      this.formControl.patchValue(
      this.questions.find(question => question.code === this.questionResult.code),
    );
    }
  }

  isOptionDisabled(question: VehicleChecksQuestion): boolean {
    const doesQuestionExist: VehicleChecksQuestion =
      this.questionsToDisable.find(questionToDisable => questionToDisable.code === question.code);
    return doesQuestionExist !== undefined;
  }

  vehicleChecksQuestionChanged(vehicleChecksQuestion: VehicleChecksQuestion): void {

    const result: QuestionResult = {
      code: vehicleChecksQuestion.code,
      description: vehicleChecksQuestion.shortName,
    };

    this.vehicleChecksQuestionChange.emit(result);
  }
}
