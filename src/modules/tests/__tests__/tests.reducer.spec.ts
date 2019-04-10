import { testsReducer, TestsModel } from '../tests.reducer';
import * as testOutcomeActions from '../../../pages/journal/components/test-outcome/test-outcome.actions';
import { TestSlot } from '../../../shared/models/DJournal';
import * as candidateReducer from '../candidate/candidate.reducer';
import * as preTestDeclarationsReducer from '../pre-test-declarations/pre-test-declarations.reducer';
import { PreTestDeclarations } from '@dvsa/mes-test-schema/categories/B';
import { TestStatus } from '../test-status/test-status.model';
import * as testStatusReducer from '../test-status/test-status.reducer';

describe('testsReducer', () => {
  const newCandidate = { candidate: { candidateId: 456 } };
  const preTestDeclarations: PreTestDeclarations = preTestDeclarationsReducer.initialState;

  beforeEach(() => {
    spyOn(candidateReducer, 'candidateReducer').and.returnValue(newCandidate);
    spyOn(preTestDeclarationsReducer, 'preTestDeclarationsReducer').and.returnValue(preTestDeclarations);
  });

  it('use the payload of a test started action to setup state for a new test', () => {
    const state = {
      currentTest: { slotId: null },
      startedTests: {},
      testLifecycles: {},
    };
    const startTestPayload: TestSlot = {
      slotDetail: {
        slotId: 123,
      },
    };
    const action = new testOutcomeActions.TestOutcomeStartTest(startTestPayload);

    const output = testsReducer(state, action);

    expect(output.currentTest.slotId).toBe('123');
  });

  it('should derive the sub-states from sub-reducers', () => {
    const state: TestsModel = {
      currentTest: { slotId: null },
      startedTests: {},
      testLifecycles: {},
    };

    const result = testsReducer(state, new testOutcomeActions.TestOutcomeStartTest({ slotDetail: { slotId: 123 } }));

    expect(candidateReducer.candidateReducer).toHaveBeenCalled();
    expect(preTestDeclarationsReducer.preTestDeclarationsReducer).toHaveBeenCalled();
    expect(result.startedTests['123'].candidate).toBe(newCandidate);
    expect(result.startedTests['123'].preTestDeclarations).toBe(preTestDeclarations);
  });

  it('should track test lifecycles independently of the started tests', () => {
    const testStatusReducerResult = TestStatus.Started;
    spyOn(testStatusReducer, 'testStatusReducer').and.returnValue(testStatusReducerResult);
    const state: TestsModel = {
      currentTest: { slotId: '123' },
      startedTests: {},
      testLifecycles: {
        456: TestStatus.Decided,
      },
    };

    const result = testsReducer(state, { type: 'dummy-action' });

    expect(testStatusReducer.testStatusReducer).toHaveBeenCalled();
    expect(result.testLifecycles['123']).toBe(TestStatus.Started);
    expect(result.testLifecycles['456']).toBe(TestStatus.Decided);
  });
});
