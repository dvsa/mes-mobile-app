import { Injectable } from '@angular/core';
import { CatBLegalRequirements } from '../../modules/tests/test-data/test-data.models';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { FaultCountProvider } from '../fault-count/fault-count';
import { TestCategory } from '../../shared/models/test-category';

@Injectable()
// TODO: This provider has tight coupling to category B
// When introducing B+E functionality this will need to adjust its typing
export class TestReportValidatorProvider {

  constructor(private faultCountProvider: FaultCountProvider) { }

  validateCatBLegalRequirements = (results: CatBLegalRequirements): Observable<boolean> =>
    of(results.normalStart1 &&
      results.normalStart2 &&
      results.angledStart &&
      results.hillStart &&
      results.manoeuvre &&
      results.vehicleChecks &&
      results.eco)

  /** Validate a dangerous or serious fault is marked when an ETA fault is marked. */
  validateETACatB = (testData: CatBUniqueTypes.TestData): Observable<boolean> => {
    const noEtaFaults = !(testData.ETA.verbal || testData.ETA.physical);

    return of(
      noEtaFaults ||
      this.faultCountProvider.getDangerousFaultSumCount(TestCategory.B, testData) !== 0 ||
      this.faultCountProvider.getSeriousFaultSumCount(TestCategory.B, testData) !== 0,
    );
  }
}
