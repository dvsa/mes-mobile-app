import { Component, Input } from '@angular/core';
import { flattenArray } from '../../../view-test-result-helpers';
import {
  DataRowListItem,
  TestRequirementsLabels,
} from '../../../components/data-row-with-list/data-list-with-row.model';
import { CatManoeuvresTestResultUnion } from '../../view-test-result.cat-manoeuvres.page';
import { get } from 'lodash';
import { FaultSummary } from '../../../../../shared/models/fault-marking.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { FaultSummaryProvider } from '../../../../../providers/fault-summary/fault-summary';

@Component({
  selector: 'debrief-card-manoeuvre',
  templateUrl: 'debrief-card.html',
})
export class DebriefCardManoeuvreComponent {

  @Input()
  testResult: CatManoeuvresTestResultUnion;

  constructor(
    private faultSummaryProvider: FaultSummaryProvider,
    private faultCountProvider: FaultCountProvider,
  ) {}

  getFlattenArray = (data: string[]): string => flattenArray(data);

  getTestRequirements = (): DataRowListItem[] => {
    return [
      {
        label: TestRequirementsLabels.uncoupleRecouple,
        checked: get(this.testResult, 'testData.uncoupleRecouple.selected', false),
      },
    ];
  }

  public getManoeuvre(): string[] {
    const isReverseLeftSelected = get(this.testResult, 'testData.manoeuvres.reverseLeft.selected', false);
    return isReverseLeftSelected ? ['Reverse Manoeuvre'] : ['None'];
  }

  public getDrivingFaults(): FaultSummary[] {
    const data = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getDrivingFaultsList(data, TestCategory.CM);
  }

  public getSeriousFaults(): FaultSummary[] {
    const data = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getSeriousFaultsList(data, TestCategory.CM);
  }

  public getDangerousFaults(): FaultSummary[] {
    const data = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getDangerousFaultsList(data, TestCategory.CM);
  }

  public getDrivingFaultCount(): number {
    const data = get(this.testResult, 'testData');
    return this.faultCountProvider.getDrivingFaultSumCount(TestCategory.CM, data);
  }

}
