import { Injectable } from '@angular/core';
import { CatBLegalRequirements } from '../../modules/tests/test-data/test-data.models';

@Injectable()
export class TestReportValidatorProvider {

  constructor() { }

  validateCatBTestReport = (results: CatBLegalRequirements): boolean =>
    results.normalStart1 &&
    results.normalStart2 &&
    results.angledStart &&
    results.hillStart &&
    results.manoeuvre &&
    results.vehicleChecks &&
    results.eco
}
