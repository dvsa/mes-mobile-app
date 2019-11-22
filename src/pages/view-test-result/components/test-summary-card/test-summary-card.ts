import { Component, Input } from '@angular/core';
import { TestSummaryCardModel } from './test-summary-card-model';
import { convertBooleanToString, flattenArray } from '../../view-test-result-helpers';
import { isBoolean } from 'lodash';

@Component({
  selector: 'test-summary-card',
  templateUrl: 'test-summary-card.html',
})
export class TestSummaryCardComponent {

  @Input()
  data: TestSummaryCardModel;

  constructor() {}

  shouldHideCard() : boolean {
    return (
      !this.data.accompaniment &&
      !this.data.provisionalLicenceProvided &&
      !this.data.passCertificateNumber &&
      !this.data.routeNumber &&
      !this.data.independentDriving &&
      !this.data.candidateDescription &&
      !this.data.debriefWitnessed &&
      !this.data.weatherConditions &&
      !this.data.D255
    );
  }

  getConvertBooleanToString = (data: boolean): string => convertBooleanToString(data);

  getFlattenArray = (data: string[]): string => flattenArray(data);

  shouldDisplayLicenceProvided = (data: boolean): boolean => isBoolean(data);
}
