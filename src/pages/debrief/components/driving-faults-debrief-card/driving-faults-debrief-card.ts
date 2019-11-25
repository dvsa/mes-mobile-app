import { Component, Input } from '@angular/core';
import { FaultSummary } from '../../../../shared/models/fault-marking.model';

@Component({
  selector: 'driving-faults-debrief-card',
  templateUrl: 'driving-faults-debrief-card.html',
})
export class DrivingFaultsDebriefCardComponent {

  @Input()
  public drivingFaults: FaultSummary[];

  @Input()
  public drivingFaultCount: number;

}
