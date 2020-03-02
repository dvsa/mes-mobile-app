import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { flattenArray } from '../../../view-test-result-helpers';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { CatD1UniqueTypes } from '@dvsa/mes-test-schema/categories/D1';
import { CatDEUniqueTypes } from '@dvsa/mes-test-schema/categories/DE';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
import {
  DataRowListItem,
  ViewTestResultLabels,
  TestRequirementsLabels,
} from '../../../components/data-row-with-list/data-list-with-row.model';
import { manoeuvreTypeLabelsCatD } from '../../../../../shared/constants/competencies/catd-manoeuvres';
import { FaultSummary } from '../../../../../shared/models/fault-marking.model';
import { FaultSummaryProvider } from '../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/common';

export type CatDTestData =
  | CatDUniqueTypes.TestData
  | CatD1UniqueTypes.TestData
  | CatDEUniqueTypes.TestData
  | CatD1EUniqueTypes.TestData;

@Component({
  selector: 'debrief-card',
  templateUrl: 'debrief-card.html',
})
export class DebriefCardComponent {

  @Input()
  data: CatDTestData;

  @Input()
  category: TestCategory;

  constructor(
    private faultSummaryProvider: FaultSummaryProvider,
    private faultCountProvider: FaultCountProvider,
  ) {}

  public getTestRequirements = (): DataRowListItem[] => {
    const testRequirements: DataRowListItem[] = [
      {
        label: TestRequirementsLabels.normalStart1,
        checked: get(this.data, 'testRequirements.normalStart1', false) ,
      },
      {
        label: TestRequirementsLabels.normalStart2,
        checked: get(this.data, 'testRequirements.normalStart2', false),
      },
      {
        label: TestRequirementsLabels.uphillStart,
        checked: get(this.data, 'testRequirements.uphillStart', false),
      },
      {
        label: TestRequirementsLabels.downhillStart,
        checked: get(this.data, 'testRequirements.downhillStart', false),
      },
      {
        label: TestRequirementsLabels.angledStartControlledStop,
        checked: get(this.data, 'testRequirements.angledStartControlledStop', false),
      },
    ];

    if (this.category === TestCategory.C1E || this.category === TestCategory.CE) {
      testRequirements.push({
        label: TestRequirementsLabels.uncoupleRecouple,
        checked: get(this.data, 'uncoupleRecouple.selected', false),
      });
    }

    return testRequirements;
  }

  public getManoeuvre(): string {
    const isReverseLeftSelected = get(this.data, 'manoeuvres.reverseLeft.selected', false);
    return isReverseLeftSelected ? manoeuvreTypeLabelsCatD.reverseLeft : 'None' ;
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
