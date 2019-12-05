
import { Component, Input } from '@angular/core';
import { FaultSummary } from '../../../../shared/models/fault-marking.model';

@Component({
  selector: 'faults-data-row',
  templateUrl: 'faults-data-row.html',
})
export class FaultsDataRowComponent {

  @Input()
  label: string;

  @Input()
  dangerousFaults: FaultSummary[];

  @Input()
  seriousFaults?: FaultSummary[];

  @Input()
  drivingFaults?: FaultSummary[];

  @Input()
  drivingFaultCount?: number;

  showNoFaultsMessage = () : boolean =>
  this.drivingFaultCount === 0 &&
  this.seriousFaults.length === 0 &&
  this.dangerousFaults.length === 0
}
