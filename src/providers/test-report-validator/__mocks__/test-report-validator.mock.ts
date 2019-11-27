import { of } from 'rxjs/observable/of';

export class TestReportValidatorProviderMock {

  isTestReportValid =
    jasmine.createSpy('isTestReportValid').and.returnValue(of(true));

}
