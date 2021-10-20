import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { convertBooleanToString, flattenArray } from '../../view-test-result-helpers';
import {
  Accompaniment,
  CommunicationPreferences,
  PassCompletion,
  TestSummary,
} from '@dvsa/mes-test-schema/categories/common';
import { TestSummary as CatAMod2TestSummary } from '@dvsa/mes-test-schema/categories/AM2';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

@Component({
  selector: 'test-summary-card',
  templateUrl: 'test-summary-card.html',
})
export class TestSummaryCardComponent {

  @Input()
  accompaniment: Accompaniment;

  @Input()
  passCompletion: PassCompletion;

  @Input()
  testSummary: TestSummary | CatAMod2TestSummary;

  @Input()
  communicationPreferences: CommunicationPreferences;

  @Input()
  testCategory: TestCategory;

  constructor() {}

  public getAccompaniedBy() : string {
    const accompaniedBy: string[] = [];

    if (get(this.accompaniment, 'ADI')) {
      accompaniedBy.push('ADI');
    }
    if (get(this.accompaniment, 'interpreter')) {
      accompaniedBy.push('Interpreter');
    }
    if (get(this.accompaniment, 'supervisor')) {
      accompaniedBy.push('Supervisor');
    }
    if (get(this.accompaniment, 'other')) {
      accompaniedBy.push('Other');
    }
    if (accompaniedBy.length === 0) {
      accompaniedBy.push('None');
    }

    return flattenArray(accompaniedBy);
  }

  public getProvisionalLicenceProvided() : string {
    return convertBooleanToString(get(this.passCompletion, 'provisionalLicenceProvided'));
  }

  public getCode78(): string  {
    const code78: boolean = get(this.passCompletion, 'code78Present', null);
    return code78 !== null ? convertBooleanToString(code78) : null;
  }

  public getPassCertificateNumber() : string {
    return get(this.passCompletion, 'passCertificateNumber');
  }

  public getRouteNumber(): number | 'None' {
    return get(this.testSummary, 'routeNumber', 'None');
  }

  public getIndependentDriving() : string {
    return get(this.testSummary, 'independentDriving', 'None');
  }

  public getCandidateDescription(): string {
    return get(this.testSummary, 'candidateDescription', 'None');
  }

  public getDebriefWitnessed(): string {
    return convertBooleanToString(get(this.testSummary, 'debriefWitnessed'));
  }

  public getWeatherConditions() : string {
    return flattenArray(get(this.testSummary, 'weatherConditions', ['None']));
  }

  public getD255() : string {
    return convertBooleanToString(get(this.testSummary, 'D255'));
  }

  public getAdditionalInformation() : string {
    return get(this.testSummary, 'additionalInformation', 'None');
  }

  public shouldDisplayLicenceProvided(data: boolean) : boolean {
    return get(this.passCompletion, 'provisionalLicenceProvided') !== undefined;
  }

  public shouldDisplayTestConductedOn() : boolean {
    return get(this.testSummary, 'modeOfTransport') !== undefined;
  }

  public getTestConductedOn(): string {
    return get(this.testSummary, 'modeOfTransport', 'None');
  }

  public getConductedLanguage(): string {
    return get(this.communicationPreferences, 'conductedLanguage', 'None');
  }

  public isManoeuvreCategory(): boolean {
    switch (this.testCategory) {
      case TestCategory.CM:
      case TestCategory.C1M:
      case TestCategory.CEM:
      case TestCategory.C1EM:
      case TestCategory.DM:
      case TestCategory.D1M:
      case TestCategory.DEM:
      case TestCategory.D1EM:
        return true;
      default:
        return false;
    }
  }
}
