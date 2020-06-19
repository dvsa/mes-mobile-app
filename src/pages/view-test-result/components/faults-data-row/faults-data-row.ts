import { Component, Input } from '@angular/core';
import { FaultSummary } from '../../../../shared/models/fault-marking.model';
import { getDrivingOrRidingLabel } from '../../../../shared/helpers/driver-type';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

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

  @Input()
  minDrivingFaultCount: number = 15;

  @Input()
  category?: string = null;

  showNoFaultsMessage = (): boolean =>
    this.drivingFaultCount === 0 &&
    this.seriousFaults.length === 0 &&
    this.dangerousFaults.length === 0

  showFaultComment = (drivingFault: FaultSummary): boolean =>
    this.drivingFaultCount > this.minDrivingFaultCount &&
    drivingFault.comment !== undefined

  constructor() {
  }

  public getDriverType(category: TestCategory): string {
    return getDrivingOrRidingLabel(category);
  }

}
