import { Component, Input } from '@angular/core';

@Component({
  selector: 'eco-debrief-card',
  templateUrl: 'eco-debrief-card.html',
})
export class EcoDebriefCardComponent {

  @Input()
  public adviceGivenControl: boolean;

  @Input()
  public adviceGivenPlanning: boolean;

}
