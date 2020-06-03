import { Component, Input } from '@angular/core';

@Component({
  selector: 'question-score',
  templateUrl: 'question-score.html',
})
export class QuestionScoreComponent {

  @Input()
  score: number;

}
