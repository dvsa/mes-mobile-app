import { testsReducer } from '../tests.reducer';
import * as testOutcomeActions from '../../../pages/journal/components/test-outcome/test-outcome.actions';
import { TestSlot } from '../../../shared/models/DJournal';
import * as candidateReducer from '../candidate/candidate.reducer';
import * as preTestDeclarationsReducer from '../pre-test-declarations/pre-test-declarations.reducer';
import { PreTestDeclarations } from '@dvsa/mes-test-schema/categories/B';

describe('testsReducer', () => {
  const newCandidate = { candidate: { candidateId: 456 } };
  const preTestDeclarations: PreTestDeclarations = preTestDeclarationsReducer.initialState;

  beforeEach(() => {
    spyOn(candidateReducer, 'candidateReducer').and.returnValue(newCandidate);
    spyOn(preTestDeclarationsReducer, 'preTestDeclarationsReducer').and.returnValue(preTestDeclarations);
  });

  it('use the payload of a test started action to setup state for a new test', () => {
    const state = {};
    const startTestPayload: TestSlot = {
      slotDetail: {
        slotId: 123,
      },
    };
    const action = new testOutcomeActions.TestOutcomeStartTest(startTestPayload);

    const output = testsReducer(state, action);

    // @ts-ignore
    expect(output.current.slotId).toBe('123');
  });

  it('should derive the sub-states from sub-reducers', () => {
    const state = {
      candidate: {
        candidateId: 789,
      },
    };

    const result = testsReducer(state, new testOutcomeActions.TestOutcomeStartTest({ slotDetail: { slotId: 123 } }));

    expect(candidateReducer.candidateReducer).toHaveBeenCalled();
    expect(preTestDeclarationsReducer.preTestDeclarationsReducer).toHaveBeenCalled();
    expect(result['123'].candidate).toBe(newCandidate);
    expect(result['123'].preTestDeclarations).toBe(preTestDeclarations);
  });
});
