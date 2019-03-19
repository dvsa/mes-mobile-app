import { candidateReducer } from '../candidate.reducer';
import { TestOutcomeStartTest } from '../../../../pages/journal/components/test-outcome/test-outcome.actions';
import { TestSlot } from '../../../../shared/models/DJournal';

describe('candidate reducer', () => {
  it('should return the candidate from a start test action', () => {
    const mockCandidate = {
      candidateId: '123',
    };
    const mockSlot = { booking: { candidate: mockCandidate } };
    // @ts-ignore
    const result = candidateReducer(null, new TestOutcomeStartTest(mockSlot as TestSlot));

    expect(result).toBe(mockCandidate);
  });
  it('should not error if there is no booking in the slot', () => {
    const mockSlot = {};

    const result = candidateReducer(null, new TestOutcomeStartTest(mockSlot));

    expect(result).toBeNull();
  });
  it('should not error if there is a booking with no candidate', () => {
    const mockSlot = { booking : { } };

    const result = candidateReducer(null, new TestOutcomeStartTest(mockSlot));

    expect(result).toBe(null);
  });
});
