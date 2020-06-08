import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal-result-item',
  templateUrl: 'modal-result-item.html',
})
export class ModalResultItemComponent {

  @Input()
  questionCode: string;
  questionScore: number;
}
