import { Component, Input } from '@angular/core';

@Component({
  selector: 'question-subtitle',
  templateUrl: 'question-subtitle.html',
})
export class QuestionSubtitleComponent {

  @Input()
  subtitle: string;

}
