import { testReducer } from '../test.reducer';
import * as testOutcomeActions from '../../../pages/journal/components/test-outcome/test-outcome.actions';
import { TestSlot } from '../../../shared/models/DJournal';
import * as candidateReducer from '../candidate/candidate.reducer';

describe('testReducer', () => {
  it('use the payload of a test started action to setup state for a new test', () => {
    const state = {};
    const startTestPayload: TestSlot = {
      slotDetail: {
        slotId: 123,
      },
      booking: {
        candidate: {
          candidateId: 789,
        },
      },
    };
    const action = new testOutcomeActions.TestOutcomeStartTest(startTestPayload);

    const output = testReducer(state, action);

    // @ts-ignore
    expect(output.current.slotId).toBe('123');
    expect(output['123'].candidate.candidateId).toBe(789);
    expect(output['123'].preTestDeclarations.insuranceDeclarationAccepted).toBe(false);
  });

  it('should derive the sub-states from sub-reducers', () => {
    const newCandidate = { candidate: { candidateId: 456 } };
    spyOn(candidateReducer, 'candidateReducer').and.returnValue(newCandidate);
    const state = {
      candidate: {
        candidateId: 789,
      },
    };

    const result = testReducer(state, new testOutcomeActions.TestOutcomeStartTest({ slotDetail: { slotId: 123 } }));

    expect(candidateReducer.candidateReducer).toHaveBeenCalled();
    // @ts-ignore
    expect(result['123'].candidate).toBe(newCandidate);
  });
});
