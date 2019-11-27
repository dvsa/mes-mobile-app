import { TestBed } from '@angular/core/testing';
import { TestReportValidatorProvider } from '../test-report-validator';
import { FaultCountProvider } from '../../fault-count/fault-count';

describe('TestReportValidator', () => {

  // let testReportValidatorProvider: TestReportValidatorProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestReportValidatorProvider,
        FaultCountProvider,
      ],
    });

    // testReportValidatorProvider = TestBed.get(TestReportValidatorProvider);
  });

});
