import { Injectable } from '@angular/core';
import { CatBLegalRequirements } from '../../modules/tests/test-data/test-data.models';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TestReportValidatorProvider {

  constructor() { }

  validateCatBTestReport = (results: CatBLegalRequirements): Observable<boolean> =>
    of(results.normalStart1 &&
      results.normalStart2 &&
      results.angledStart &&
      results.hillStart &&
      results.manoeuvre &&
      results.vehicleChecks &&
      results.eco)
}
