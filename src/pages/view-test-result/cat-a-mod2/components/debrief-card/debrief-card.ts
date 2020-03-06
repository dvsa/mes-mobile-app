import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { flattenArray } from '../../../view-test-result-helpers';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { TestData } from '@dvsa/mes-test-schema/categories/AM2';
import {
  DataRowListItem,
  ViewTestResultLabels,
  TestRequirementsLabels,
} from '../../../components/data-row-with-list/data-list-with-row.model';
import { FaultSummary } from '../../../../../shared/models/fault-marking.model';
import { FaultSummaryProvider } from '../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';

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

  public getTestRequirements = (): DataRowListItem[] => {
    return [
      {
        label: TestRequirementsLabels.normalStart1,
        checked: get(this.data, 'testRequirements.normalStart1', false) ,
      },
      {
        label: TestRequirementsLabels.normalStart2,
        checked: get(this.data, 'testRequirements.normalStart2', false),
      },
      {
        label: TestRequirementsLabels.hillStart,
        checked: get(this.data, 'testRequirements.hillStart', false),
      },
      {
        label: TestRequirementsLabels.angledStart,
        checked: get(this.data, 'testRequirements.angledStart', false),
      },
    ];
  }

  public getEco(): DataRowListItem[] {
    return [
      {
        label: ViewTestResultLabels.control,
        checked: get(this.data, 'eco.adviceGivenControl', false),
      },
      {
        label: ViewTestResultLabels.planning,
        checked: get(this.data, 'eco.adviceGivenPlanning', false),
      },
    ];
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

  public getETA(): string {
    const eta: string[] = [];
    if (get(this.data, 'ETA.verbal')) {
      eta.push('Verbal');
    }
    if (eta.length === 0) {
      eta.push('None');
    }
    return flattenArray(eta);
  }

  public getSafetyQuestions(): QuestionResult[] {
    return get(this.data, 'safetyAndBalanceQuestions.safetyQuestions', []);
  }

  public getBalanceQuestions(): QuestionResult[] {
    return get(this.data, 'safetyAndBalanceQuestions.balanceQuestions', []);
  }
}
