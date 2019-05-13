import { TestBed } from '@angular/core/testing';
import { TestSubmissionProvider } from '../test-submission';

describe('TestResultCalculatorProvider', () => {

  let testSubmissionProvider: TestSubmissionProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestSubmissionProvider,
      ],
    });

    testSubmissionProvider = TestBed.get(TestSubmissionProvider);
  });

  describe('submitTests', () => {
    it('should return a successful result', (done) => {
      testSubmissionProvider.submitTests([]).subscribe((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });
});
