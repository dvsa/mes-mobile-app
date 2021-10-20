import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { flattenArray } from '../../../view-test-result-helpers';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  DataRowListItem,
  ViewTestResultLabels,
  TestRequirementsLabels,
} from '../../../components/data-row-with-list/data-list-with-row.model';
import {
  manoeuvreTypeLabelsCatHomeTest,
} from '../../../../../shared/constants/competencies/cathometest-manoeuvres';
import { FaultSummary } from '../../../../../shared/models/fault-marking.model';
import { FaultSummaryProvider } from '../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';

export type HomeTestData =
  | CatFUniqueTypes.TestData
  | CatGUniqueTypes.TestData
  | CatHUniqueTypes.TestData
  | CatKUniqueTypes.TestData;

@Component({
  selector: 'debrief-card',
  templateUrl: 'debrief-card.html',
})
export class DebriefCardComponent {

  @Input()
  data: HomeTestData;

  @Input()
  category: TestCategory;

  constructor(
    private faultSummaryProvider: FaultSummaryProvider,
    private faultCountProvider: FaultCountProvider,
  ) {
  }

  public getTestRequirements = (): DataRowListItem[] => {
    return [
      {
        label: TestRequirementsLabels.normalStart1,
        checked: get(this.data, 'testRequirements.normalStart1', false),
      },
      {
        label: TestRequirementsLabels.normalStart2,
        checked: get(this.data, 'testRequirements.normalStart2', false),
      },
      {
        label: TestRequirementsLabels.angledStart,
        checked: get(this.data, 'testRequirements.angledStart', false),
      },
      {
        label: TestRequirementsLabels.hillStart,
        checked: get(this.data, 'testRequirements.uphillStartDesignatedStart', false),
      },
    ];
  }

  public getHighwayCode(): DataRowListItem[] {
    const isHighwayCodeSelected = get(this.data, 'highwayCodeSafety.selected', false);
    return [
      {
        label: isHighwayCodeSelected ? 'Completed' : 'Not Completed',
        checked: isHighwayCodeSelected,
      },
    ];
  }

  public getManoeuvre(): string {
    const isReverseLeftSelected = get(this.data, 'manoeuvres.reverseLeft.selected', false);
    return isReverseLeftSelected ? manoeuvreTypeLabelsCatHomeTest.reverseLeft : 'None' ;
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

  public controlledStop(): DataRowListItem[] {
    const isControlledStopSelected = get(this.data, 'controlledStop.selected', false);
    return [
      {
        label: isControlledStopSelected ? 'Completed' : 'Not Completed',
        checked: isControlledStopSelected,
      },
    ];
  }

  public getDrivingFaults(): FaultSummary[] {
    return this.faultSummaryProvider.getDrivingFaultsList(this.data, this.category);
  }

  public getSeriousFaults(): FaultSummary[] {
    return this.faultSummaryProvider.getSeriousFaultsList(this.data, this.category);
  }

  public getDangerousFaults(): FaultSummary[] {
    return this.faultSummaryProvider.getDangerousFaultsList(this.data, this.category);
  }

  public getDrivingFaultCount(): number {
    return this.faultCountProvider.getDrivingFaultSumCount(this.category, this.data);
  }

  public getETA(): string {
    const eta: string[] = [];

    if (get(this.data, 'ETA.physical')) {
      eta.push('Physical');
    }
    if (get(this.data, 'ETA.verbal')) {
      eta.push('Verbal');
    }
    if (eta.length === 0) {
      eta.push('None');
    }
    return flattenArray(eta);
  }

  public getShowMeQuestions(): QuestionResult[] {
    return get(this.data, 'vehicleChecks.showMeQuestions', []);
  }

  public getTellMeQuestions(): QuestionResult[] {
    return get(this.data, 'vehicleChecks.tellMeQuestions', []);
  }
}
