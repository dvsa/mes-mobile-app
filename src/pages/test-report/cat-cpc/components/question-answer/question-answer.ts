import { Component, Input } from '@angular/core';
import { Answer } from '@dvsa/mes-test-schema/categories/CPC';

@Component({
  selector: 'question-answer',
  templateUrl: 'question-answer.html',
})
export class QuestionAnswerComponent {

  @Input()
  answer: Answer;

  @Input()
  answerNumber: string;

  getID = (answerNumber: string): string => `answer${answerNumber}`;

  getLabel = (answerNumber: string): string => `answer-label-${answerNumber}`;

}
