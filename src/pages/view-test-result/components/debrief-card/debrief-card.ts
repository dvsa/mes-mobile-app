import { Component, Input } from '@angular/core';
import { DebriefCardModel } from './debrief-card.model';

@Component({
  selector: 'debrief-card',
  templateUrl: 'debrief-card.html',
})
export class DebriefCardComponent {

  @Input()
  data: DebriefCardModel;

  constructor() {}

  shouldHideCard(): boolean {
    return false;
  }

}
