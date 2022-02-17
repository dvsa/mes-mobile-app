import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import {
  Accompaniment, CommunicationPreferences,
  PassCompletion, TestSummary,
} from '@dvsa/mes-test-schema/categories/common';
import { convertBooleanToString, flattenArray } from '../../../view-test-result-helpers';
import { TestSummary as CatAMod2TestSummary } from '@dvsa/mes-test-schema/categories/AM2';

@Component({
  selector: 'test-summary-card-cat-manoeuvre',
  templateUrl: 'test-summary-card.html',
})
export class TestSummaryCardCatManoeuvreComponent {

  @Input()
  testResult: any;

  @Input()
  passCompletion: PassCompletion;

  @Input()
  accompaniment: Accompaniment;

  @Input()
  testSummary: TestSummary | CatAMod2TestSummary;

  @Input()
  communicationPreferences: CommunicationPreferences;

  public getPassCertificateNumber() : string {
    return get(this.passCompletion, 'passCertificateNumber');
  }

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

  public getConductedLanguage(): string {
    return get(this.communicationPreferences, 'conductedLanguage', 'None');
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

}
