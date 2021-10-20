import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import {
  PassCompletion,
} from '@dvsa/mes-test-schema/categories/common';

@Component({
  selector: 'test-summary-card-cat-manoeuvre',
  templateUrl: 'test-summary-card.html',
})
export class TestSummaryCardCatManoeuvreComponent {

  @Input()
  passCompletion: PassCompletion;

  public getPassCertificateNumber() : string {
    return get(this.passCompletion, 'passCertificateNumber');
  }
}
