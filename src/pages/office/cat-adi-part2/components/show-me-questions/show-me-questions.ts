import { Component, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import {
  OutcomeBehaviourMapProvider,
  VisibilityType,
} from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import { find } from 'lodash';
import { Select } from 'ionic-angular';

@Component({
  selector: 'show-me-questions-cat-adi2',
  templateUrl: 'show-me-questions.html',
})
export class ShowMeQuestionsCatADI2Component implements OnChanges {

  @ViewChild('showMeQuestionSelect') selectRef: Select;

  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  showMeQuestions: QuestionResult[];

  @Input()
  showMeQuestionOptions: VehicleChecksQuestion[];

  @Input()
  formGroup: FormGroup;

  @Output()
  showMeQuestionsChange = new EventEmitter<VehicleChecksQuestion[]>();

  values = [];

  private formControl: FormControl;
  static readonly fieldName: string = 'showMeQuestions';

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) {
  }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl([]);
      this.formGroup.addControl(ShowMeQuestionsCatADI2Component.fieldName, this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome,
      ShowMeQuestionsCatADI2Component.fieldName);

    if (visibilityType === VisibilityType.NotVisible) {
      this.formGroup.get(ShowMeQuestionsCatADI2Component.fieldName).clearValidators();
    } else {
      this.formGroup.get(ShowMeQuestionsCatADI2Component.fieldName).setValidators([Validators.required]);
    }
    this.formControl.patchValue(this.showMeQuestions);
  }

  disableInputs(index: number): boolean {
    const questionResults: QuestionResult[] = this.formControl.value;
    const codes: string[] = questionResults.map((result: QuestionResult) => result.code || null);

    if (codes.filter((code: string) => code).length >= 2) {
      return !find(questionResults, { code: this.showMeQuestionOptions[index].code });
    }
    return false;
  }

  optionChange(r, i) {
    // console.log(i);
    // this.values = [...this.values, r];
    // console.log(this.values);
    console.log(this.selectRef.getValues());
  }

  showMeQuestionsChanged(showMeQuestions: VehicleChecksQuestion[]): void {
    this.ngOnChanges();
    this.showMeQuestionsChange.emit(showMeQuestions);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
