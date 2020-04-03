import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import {
  OutcomeBehaviourMapProvider,
  VisibilityType,
} from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { VehicleChecksQuestion } from '../../../../../providers/question/vehicle-checks-question.model';
import {
  // find,
  uniqBy,
  uniq,
} from 'lodash';
import { Select } from 'ionic-angular';

// type VehicleChecksQuestionDisable = (VehicleChecksQuestion & { disabled: boolean; })[];

@Component({
  selector: 'show-me-questions-cat-adi2',
  templateUrl: 'show-me-questions.html',
})
export class ShowMeQuestionsCatADI2Component implements OnInit, OnChanges {

  @ViewChild('showMeQuestionSelect') selectRef: Select;

  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  showMeQuestions: QuestionResult[];

  @Input()
  showMeQuestionOptions: VehicleChecksQuestion[];

  // Created as i've added a disabled property - might not be needed
  showMeQuestionOptionsDisabled: { code: string; description: string; shortName: string; disabled: boolean; }[];

  @Input()
  formGroup: FormGroup;

  @Output()
  showMeQuestionsChange = new EventEmitter<VehicleChecksQuestion[]>();

  // @TODO - rename and make type strict
  values: any[] = [];

  // @TODO - rename and make type strict
  index: number[] = [];

  private formControl: FormControl;
  static readonly fieldName: string = 'showMeQuestions';

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) {
  }

  // Might not be needed if not using 'disabled' property directly
  ngOnInit(): void {
    this.showMeQuestionOptionsDisabled = this.showMeQuestionOptions.map(v => ({ ...v, disabled: false }));
  }

  onDocumentReady(): any {
    const values: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

    values.forEach((res: number) => {
      console.log(res);
      // tslint:disable-next-line:max-line-length
      document.querySelector(`#alert-input-0-${res}`).setAttribute('onclick', 'ng.probe(document.getElementById(\'show-me-questions-card\')).componentInstance.debug()');
    });
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

  showMeQuestionsChanged(showMeQuestions: VehicleChecksQuestion[]): void {
    this.showMeQuestionsChange.emit(showMeQuestions);
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

  debug = (): void => {
    console.log('debug');
  }

  selection = (question: VehicleChecksQuestion, index: number): void => {
    this.values.push(question);
    this.index.push(index);

    console.log('question', question);

    this.values = this.uniqueArray(this.values, 'code');
    this.index = this.uniqueArray(this.index, null);

    // @TODO - create array dynamically (Matt B)
    const filteredIndices: number[] = [0, 1, 2, 3, 4, 5, 6, 7].filter(v => this.index.indexOf(v) === -1);

    filteredIndices.forEach((res: number) => {
      if (this.values.length >= 2 && res !== undefined && document.querySelector(`#alert-input-0-${res}`)) {
        document.querySelector(`#alert-input-0-${res}`).setAttribute('disabled', 'true');
      }
    });
  }

  uniqueArray = (array: any[], key: string): any[] => {
    if (!key) {
      return uniq(array);
    }
    return uniqBy(array, key);
  }

}
