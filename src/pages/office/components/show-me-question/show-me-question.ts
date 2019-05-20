import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShowMeQuestion } from '../../../../providers/question/show-me-question.model';
import {
  OutcomeBehaviourMapProvider,
  VisibilityType,
} from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';

@Component({
  selector: 'show-me-question',
  templateUrl: 'show-me-question.html',
})
export class ShowMeQuestionComponent implements OnChanges {
  @Input()
  display: boolean;

  @Input()
  outcome: string;

  @Input()
  showMeQuestion: ShowMeQuestion;

  @Input()
  showMeQuestionOptions: ShowMeQuestion[];

  @Input()
  formGroup: FormGroup;

  @Output()
  showMeQuestionChange = new EventEmitter<ShowMeQuestion>();

  private formControl: FormControl;
  static readonly fieldName: string = 'showMeQuestion';

  constructor(private outcomeBehaviourProvider: OutcomeBehaviourMapProvider) { }

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl([]);
      this.formGroup.addControl(ShowMeQuestionComponent.fieldName, this.formControl);
    }
    const visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome,
      ShowMeQuestionComponent.fieldName);

    if (visibilityType === VisibilityType.NotVisible) {
      this.formGroup.get(ShowMeQuestionComponent.fieldName).clearValidators();
    } else {
      this.formGroup.get(ShowMeQuestionComponent.fieldName).setValidators([Validators.required]);
    }
    this.formControl.patchValue(this.showMeQuestion);
  }

  showMeQuestionChanged(showMeQuestion: ShowMeQuestion): void {
    if (this.formControl.valid) {
      this.showMeQuestionChange.emit(showMeQuestion);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }

}
