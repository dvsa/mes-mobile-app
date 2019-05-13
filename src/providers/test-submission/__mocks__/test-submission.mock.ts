import { of } from 'rxjs/observable/of';

export class TestSubmissionProviderMock {

  submitTests = jasmine.createSpy('submitTests').and.returnValue(of(true));
}
