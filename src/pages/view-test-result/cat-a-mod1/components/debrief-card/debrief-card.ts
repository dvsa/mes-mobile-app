import { Component, Input } from '@angular/core';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { FaultSummary } from '../../../../../shared/models/fault-marking.model';
import { FaultSummaryProvider } from '../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';

@Component({
  selector: 'debrief-card',
  templateUrl: 'debrief-card.html',
})
export class DebriefCardComponent {

  @Input()
  data: TestData;

  constructor(
    private faultSummaryProvider: FaultSummaryProvider,
    private faultCountProvider: FaultCountProvider,
  ) {}

  ngOnInit() {
    console.log('this.data', this.data);
  }

  public getDrivingFaults(): FaultSummary[] {
    return this.faultSummaryProvider.getDrivingFaultsList(this.data, TestCategory.EUAM1);
  }

  public getSeriousFaults(): FaultSummary[] {
    return this.faultSummaryProvider.getSeriousFaultsList(this.data, TestCategory.EUAM1);
  }

  public getDangerousFaults(): FaultSummary[] {
    return this.faultSummaryProvider.getDangerousFaultsList(this.data, TestCategory.EUAM1);
  }

  public getDrivingFaultCount(): number {
    return this.faultCountProvider.getDrivingFaultSumCount(TestCategory.EUAM1, this.data);
  }
}
