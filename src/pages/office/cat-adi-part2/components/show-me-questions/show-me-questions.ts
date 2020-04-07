import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { uniqueId } from 'lodash';
import {
  OutcomeBehaviourMapProvider,
  VisibilityType,
} from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';

@Component({
  selector: 'show-me-questions-cat-adi2',
  templateUrl: 'show-me-questions.html',
})
export class ShowMeQuestionsCatADI2Component implements OnChanges {

  @Input()
  questionResult: QuestionResult;

  @Input()
  questions: VehicleChecksQuestion[];

  @Input()
  questionNumber: number;

  @Input()
  questionsToDisable: QuestionResult[];

  @Input()
  formGroup: FormGroup;

  @Input()
  outcome: string;

  @Output()
  showMeQuestionsChange = new EventEmitter<QuestionResult>();

  private formControl: FormControl;

  readonly questionId: string = uniqueId();
  readonly fieldName: string = `showMeQuestions_${this.questionId}`;

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) {
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl({ disabled: true });
      this.formGroup.addControl(this.fieldName, this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(
      this.outcome,
      this.fieldName,
    );

    if (visibilityType === VisibilityType.NotVisible) {
      this.formGroup.get(this.fieldName).clearValidators();
    } else {
      this.formGroup.get(this.fieldName).setValidators([Validators.required]);
    }

    if (this.questionResult) {
      this.formControl.patchValue(this.findQuestion());
    }
  }

  showMeQuestionsChanged(showMeQuestions: VehicleChecksQuestion): void {
    const result: QuestionResult = {
      code: showMeQuestions.code,
      description: showMeQuestions.shortName,
    };
    this.showMeQuestionsChange.emit(result);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  isOptionDisabled(question: VehicleChecksQuestion): boolean {
    const doesQuestionExist: QuestionResult =
      this.questionsToDisable.find(
        questionToDisable => questionToDisable.code === question.code &&
          questionToDisable.code !== this.questionResult.code);

    return doesQuestionExist !== undefined;
  }

  findQuestion(): VehicleChecksQuestion {
    return this.questions.find(question => question.code === this.questionResult.code);
  }
}
