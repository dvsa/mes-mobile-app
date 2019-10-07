import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TellMeQuestion } from '../../../../../providers/question/tell-me-question.model';

@Component({
  selector: 'tell-me-question-card',
  templateUrl: 'tell-me-question-card.html',
})
export class TellMeQuestionCardComponent {

  @Input()
  formGroup: FormGroup;

  @Input()
  tellMeQuestion: TellMeQuestion;

  @Input()
  tellMeQuestions: TellMeQuestion[];

  @Input()
  tellMeQuestionOutcome: string;

  @Input()
  tellMeQuestionSelected: boolean;

  @Output()
  tellMeQuestionChange = new EventEmitter<TellMeQuestion>();

  @Output()
  tellMeQuestionOutcomeChange = new EventEmitter<string>();

  questionFormControl: FormControl;
  outcomeFormControl: FormControl;
  questionValid: boolean = true;
  outcomeValid: boolean = true;

  get questionInvalid(): boolean {
    const question = this.formGroup.get('tellMeQuestion');
    if (!question) {
      return false;
    }
    return !question.valid && question.dirty;
  }

  get outcomeInvalid(): boolean {
    const outcome = this.formGroup.get('tellMeQuestionOutcome');
    if (!outcome) {
      return false;
    }
    return !outcome.valid && outcome.dirty;
  }

  tellMeQuestionChanged(tellMeQuestion: TellMeQuestion) {
    this.tellMeQuestionChange.emit(tellMeQuestion);
  }
  tellMeQuestionOutcomeChanged(outcome: string) {
    this.tellMeQuestionOutcomeChange.emit(outcome);
  }
}
