export class TestReportValidatorProviderMock {

  validateCatBTestReport =
    jasmine.createSpy('validateCatBTestReport').and.returnValue(true);

}
