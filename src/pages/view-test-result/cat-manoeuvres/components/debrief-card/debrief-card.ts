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

  showUncoupleRecoupleTestRequirement = () => {
    switch (this.testResult.category) {
      case TestCategory.CEM:
      case TestCategory.C1EM:
      case TestCategory.DEM:
      case TestCategory.D1EM:
        return true;
      default:
        return false;
    }
  }

  getTestRequirements = (): DataRowListItem[] => {
    return [
      {
        label: TestRequirementsLabels.uncoupleRecouple,
        checked: get(this.testResult, 'testData.uncoupleRecouple.selected', false),
      },
    ];
  }

  public getManoeuvre(): string[] {
    const isReverseSelected = get(this.testResult, 'testData.manoeuvres.reverseManoeuvre.selected', false);
    return isReverseSelected ? ['Reverse Manoeuvre'] : ['None'];
  }

  public getDrivingFaults(): FaultSummary[] {
    const data = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getDrivingFaultsList(data, this.testResult.category as TestCategory);
  }

  public getSeriousFaults(): FaultSummary[] {
    const data = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getSeriousFaultsList(data, this.testResult.category as TestCategory);
  }

  public getDangerousFaults(): FaultSummary[] {
    const data = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getDangerousFaultsList(data, this.testResult.category as TestCategory);
  }

  public getDrivingFaultCount(): number {
    const data = get(this.testResult, 'testData');
    return this.faultCountProvider.getDrivingFaultSumCount(this.testResult.category as TestCategory, data);
  }

}
