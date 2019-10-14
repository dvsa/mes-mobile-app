import { Component, Input } from '@angular/core';
import { MultiFaultAssignableCompetency } from '../../../../shared/models/fault-marking.model';

@Component({
  selector: 'driving-faults-debrief-card',
  templateUrl: 'driving-faults-debrief-card.html',
})
export class DrivingFaultsDebriefCardComponent {

  @Input()
  public drivingFaults: MultiFaultAssignableCompetency[];

  @Input()
  public drivingFaultCount: number;

}
