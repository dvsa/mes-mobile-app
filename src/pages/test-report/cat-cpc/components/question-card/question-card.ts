import { Component, Input } from '@angular/core';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';

@Component({
  selector: 'question-card',
  templateUrl: 'question-card.html',
})
export class QuestionCardComponent {

  @Input()
  question: Question;

}
