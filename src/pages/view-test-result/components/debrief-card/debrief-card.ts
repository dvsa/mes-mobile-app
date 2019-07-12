import { Component, Input } from '@angular/core';
import { DebriefCardModel } from './debrief-card.model';
import { flattenArray } from '../../view-test-result-helpers';

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

  getFlattenArray = (data: string[]): string => flattenArray(data);

}
