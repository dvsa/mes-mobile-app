export class TestReportValidatorProviderMock {

  isTestReportValid =
    jasmine.createSpy('isTestReportValid').and.returnValue(true);

  getMissingLegalRequirements =
    jasmine.createSpy('getMissingLegalRequirements').and.returnValue([]);

}
