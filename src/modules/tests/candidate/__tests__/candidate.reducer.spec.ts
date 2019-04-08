import { candidateReducer } from '../candidate.reducer';
import { PopulateCandidateDetails } from '../candidate.actions';

describe('candidate reducer', () => {
  it('should return the candidate from a start test action', () => {
    const mockCandidate = {
      candidateId: '123',
    };
    const result = candidateReducer(null, new PopulateCandidateDetails(mockCandidate));

    expect(result).toBe(mockCandidate);
  });
});
