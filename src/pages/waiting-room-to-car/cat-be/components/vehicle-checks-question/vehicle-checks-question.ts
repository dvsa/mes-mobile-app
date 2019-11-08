import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {VehicleChecksQuestion} from '../../../../../providers/question/vehicle-checks-question.model';
import {QuestionResult} from '@dvsa/mes-test-schema/categories/common';

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
  questionsToDisable: QuestionResult[];

  @Input()
  formGroup: FormGroup;

  @Input()
  index: number;

  @Output()
  vehicleChecksQuestionChange = new EventEmitter<QuestionResult>();

  @Output()
  vehicleChecksQuestionOutcomeChange = new EventEmitter<QuestionResult>();

  private questionFormControl: FormControl;
  private questionOutcomeFormControl: FormControl;

  readonly questionFieldName: string = 'vehicleChecksQuestion';
  readonly questionOutcomeFieldName: string = 'vehicleChecksQuestionOutcome';

  ngOnChanges(): void {
    if (!this.questionFormControl) {
      this.questionFormControl = new FormControl({disabled: true});
      this.formGroup.addControl(`${this.questionFieldName}_${this.index}`, this.questionFormControl);
    }

    if (!this.questionOutcomeFormControl) {
      this.questionOutcomeFormControl = new FormControl();
        this.formGroup.addControl(`${this.questionOutcomeFieldName}_${this.index}`, this.questionFormControl);
    }

    if (this.questionResult) {
      this.questionFormControl.patchValue(this.findQuestion());
      this.questionOutcomeFormControl.patchValue(this.questionResult.outcome);
    }
  }

  isOptionDisabled(question: VehicleChecksQuestion): boolean {
    const doesQuestionExist: QuestionResult =
      this.questionsToDisable.find(questionToDisable => questionToDisable.code === question.code);
    return doesQuestionExist !== undefined;
  }

  vehicleChecksQuestionChanged(vehicleChecksQuestion: VehicleChecksQuestion): void {

    const result: QuestionResult = {
      code: vehicleChecksQuestion.code,
      description: vehicleChecksQuestion.shortName,
    };
    console.log(result);
    this.vehicleChecksQuestionChange.emit(result);
  }

  vehicleChecksPassSelected() {
    const result: QuestionResult = {
      outcome: 'P',
      code: this.questionResult.code,
      description: this.questionResult.description,
    };

    this.vehicleChecksQuestionOutcomeChange.emit(result);
  }

  vehicleChecksDrivingFaultSelected() {
    const result: QuestionResult = {
      outcome: 'DF',
      code: this.questionResult.code,
      description: this.questionResult.description,
    };

    this.vehicleChecksQuestionOutcomeChange.emit(result);
  }

  findQuestion(): VehicleChecksQuestion {
    return this.questions.find(question => question.code === this.questionResult.code);
  }

  shouldShowOutcomeFields(): boolean {
    if (this.questionResult && this.questionResult.code && this.questionResult.description) {
      return true;
    }
    return false;
  }
}
