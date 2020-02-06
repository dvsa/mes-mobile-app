import { Component, Input } from '@angular/core';
import { Avoidance, EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';

@Component({
  selector: 'speed-check-debrief-card',
  templateUrl: 'speed-check-debrief-card.html',
})
export class SpeedCheckDebriefCardComponent {

  @Input()
  public emergencyStop: EmergencyStop;

  @Input()
  public avoidance: Avoidance;

  @Input()
  public avoidanceAttempted: boolean;
}
