import { Injectable } from '@angular/core';
import { CatBLegalRequirements } from '../../modules/tests/test-data/test-data.models';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TestData } from '@dvsa/mes-test-schema/categories/B';
import {
  getDangerousFaultSummaryCount,
  getSeriousFaultSummaryCount,
} from '../../modules/tests/test-data/test-data.selector';

@Injectable()
export class TestReportValidatorProvider {

  constructor() { }

  validateCatBLegalRequirements = (results: CatBLegalRequirements): Observable<boolean> =>
    of(results.normalStart1 &&
      results.normalStart2 &&
      results.angledStart &&
      results.hillStart &&
      results.manoeuvre &&
      results.vehicleChecks &&
      results.eco)

  /** Validate a dangerous or serious fault is marked when an ETA fault is marked. */
  validateCatBEta = (testData: TestData): Observable<boolean> => {
    const noEtaFaults = !(testData.ETA.verbal || testData.ETA.physical);

    return of(
      noEtaFaults ||
      getDangerousFaultSummaryCount(testData) !== 0 ||
      getSeriousFaultSummaryCount(testData) !== 0,
    );
  }
}
