import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal-result-item',
  templateUrl: 'modal-result-item.html',
})
export class ModalResultItemComponent {

  @Input()
  label: string;

  @Input()
  score: number;

  @Input()
  passMark: number;

  getOutcomeIcon(): string {
    const passImage = '../../../../../../../assets/imgs/greenCorrectAnswer.png';
    const failImage = '../../../../../../../assets/imgs/redWrongAnswer.png';
    return (this.score >= this.passMark ? passImage : failImage);
  }

}
