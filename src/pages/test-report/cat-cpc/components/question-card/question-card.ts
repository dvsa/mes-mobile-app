import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';

@Component({
  selector: 'question-card',
  templateUrl: 'question-card.html',
})
export class QuestionCardComponent {

  @Input()
  question: Question;

  @Input()
  questionNumber: number;

  @Output()
  answerPayload = new EventEmitter();

  // @TODO - Make type for details
  answerChanged = (details: any): void => {
    this.answerPayload.emit({ questionNumber: this.questionNumber, ...details });
  }

}
