import { Injectable } from '@angular/core';
import { CatBLegalRequirements } from '../../modules/tests/test_data/test-data.models';

@Injectable()
export class TestReportValidatorProvider {

  constructor() { }

  validateCatBTestReport = (results: CatBLegalRequirements): boolean =>
    results.normalStop1 &&
    results.normalStop2 &&
    results.angledStart &&
    results.hillStart &&
    results.manoeuvre &&
    results.vehicleChecks &&
    results.eco
}
