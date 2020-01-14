import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { flattenArray, convertBooleanToString } from '../../view-test-result-helpers';

@Component({
  selector: 'test-summary-card',
  templateUrl: 'test-summary-card.html',
})
export class TestSummaryCardComponent {

  @Input()
  data: CatBEUniqueTypes.TestResult | CatBUniqueTypes.TestResult;

  constructor() {}

  public getAccompaniedBy() : string {
    const accompaniedBy: string[] = [];

    if (get(this.data, 'accompaniment.ADI')) {
      accompaniedBy.push('ADI');
    }
    if (get(this.data, 'accompaniment.interpreter')) {
      accompaniedBy.push('Interpreter');
    }
    if (get(this.data, 'accompaniment.supervisor')) {
      accompaniedBy.push('Supervisor');
    }
    if (get(this.data, 'accompaniment.other')) {
      accompaniedBy.push('Other');
    }
    if (accompaniedBy.length === 0) {
      accompaniedBy.push('None');
    }

    return flattenArray(accompaniedBy);
  }

  public getProvisionalLicenceProvided() : string {
    return convertBooleanToString(get(this.data, 'passCompletion.provisionalLicenceProvided'));
  }

  public getPassCertificateNumber() : string {
    return get(this.data, 'passCompletion.passCertificateNumber');
  }

  public getRouteNumber(): string {
    return get(this.data, 'testSummary.routeNumber', 'None');
  }

  public getIndependentDriving() : string {
    return get(this.data, 'testSummary.independentDriving', 'None');
  }

  public getCandidateDescription(): string {
    return get(this.data, 'testSummary.candidateDescription', 'None');
  }

  public getDebriefWitnessed(): string {
    return convertBooleanToString(get(this.data, 'testSummary.debriefWitnessed'));
  }

  public getWeatherConditions() : string {
    return flattenArray(get(this.data, 'testSummary.weatherConditions', ['None']));
  }

  public getD255() : string {
    return convertBooleanToString(get(this.data, 'testSummary.D255'));
  }

  public getAdditionalInformation() : string {
    return get(this.data, 'testSummary.additionalInformation', 'None');
  }

  public shouldDisplayLicenceProvided(data: boolean) : boolean {
    return get(this.data, 'passCompletion.provisionalLicenceProvided', false);
  }
}
