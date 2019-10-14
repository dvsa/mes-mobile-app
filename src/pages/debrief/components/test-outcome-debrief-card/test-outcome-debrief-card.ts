import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-outcome-debrief-card',
  templateUrl: 'test-outcome-debrief-card.html',
})
export class TestOutcomeDebriefCardComponent {

  @Input()
  public outcome: string;

}
