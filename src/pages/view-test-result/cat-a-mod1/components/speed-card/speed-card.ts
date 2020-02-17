import { Component, Input } from '@angular/core';
import { Avoidance, EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';

@Component({
  selector: 'speed-card',
  templateUrl: 'speed-card.html',
})
export class SpeedCardComponent {

  @Input()
  public emergencyStop: EmergencyStop;

  @Input()
  public avoidance: Avoidance;
}
