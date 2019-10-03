import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TellMeQuestion } from '../../../../../providers/question/tell-me-question.model';

@Component({
  selector: 'tell-me-question',
  templateUrl: 'tell-me-question.html',
})
export class TellMeQuestionComponent implements OnChanges {

  @Input()
  tellMeQuestion: TellMeQuestion;

  @Input()
  tellMeQuestions: TellMeQuestion[];

  @Input()
  formGroup: FormGroup;

  @Output()
  tellMeQuestionChange = new EventEmitter<TellMeQuestion>();

  private formControl: FormControl;

  ngOnChanges(): void {
    if (!this.formControl) {
      this.formControl = new FormControl('TellMeQuestion', [Validators.required]);
      this.formGroup.addControl('tellMeQuestion', this.formControl);
    }
    this.formControl.patchValue(this.tellMeQuestion);
  }

  tellMeQuestionChanged(tellMeQuestion: TellMeQuestion): void {
    if (this.formControl.valid) {
      this.tellMeQuestionChange.emit(tellMeQuestion);
    }
  }

  get invalid(): boolean {
    return !this.formControl.valid && this.formControl.dirty;
  }
}
