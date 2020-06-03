import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question5 } from '@dvsa/mes-test-schema/categories/CPC';

@Component({
  selector: 'question-five-card',
  templateUrl: 'question-five-card.html',
})
export class QuestionFiveCardComponent {

  @Input()
  question: Question5;

  @Output()
  answerPayload = new EventEmitter();

  // @TODO - Make type for details
  answerChanged = (details: any): void => {
    this.answerPayload.emit({ questionNumber: 5, ...details });
  }

}
