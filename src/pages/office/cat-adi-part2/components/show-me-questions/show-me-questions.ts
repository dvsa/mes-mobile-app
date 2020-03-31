import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  showMeQuestions: VehicleChecksQuestion[];

  @Input()
  showMeQuestionOptions: VehicleChecksQuestion[];

  @Input()
  formGroup: FormGroup;

  @Output()
  showMeQuestionsChange = new EventEmitter<VehicleChecksQuestion[]>();

  private formControl: FormControl;
  static readonly fieldName: string = 'showMeQuestions';

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

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

}
