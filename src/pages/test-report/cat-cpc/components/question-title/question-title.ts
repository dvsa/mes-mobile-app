import { Component, Input } from '@angular/core';
import { Question } from '@dvsa/mes-test-schema/categories/CPC';

@Component({
  selector: 'question-title',
  templateUrl: 'question-title.html',
})
export class QuestionTitleComponent {

  @Input()
  question: Question;

}
