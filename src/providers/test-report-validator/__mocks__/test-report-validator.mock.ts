import { of } from 'rxjs/observable/of';

export class TestReportValidatorProviderMock {

  validateCatBTestReport =
    jasmine.createSpy('validateCatBTestReport').and.returnValue(of(true));

}
