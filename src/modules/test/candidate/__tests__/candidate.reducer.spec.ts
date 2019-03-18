import { candidateReducer } from '../candidate.reducer';
import { ChangeActiveCandidate } from '../candidate.actions';
import { Candidate } from '../../../../shared/models/DJournal';

describe('candidate reducer', () => {
  const newCandidate: Candidate = {
    candidateName: {
      firstName: 'Joe',
      lastName: 'Bloggs',
    },
    driverNumber: 'blog567',
  };

  describe('when there is no active candidate', () => {
    it('should add the candidate', () => {
      const result = candidateReducer(null, new ChangeActiveCandidate(newCandidate));

      expect(result).toBe(newCandidate);
    });
  });

  describe('when there is already an active candidate', () => {
    it('should replace that candidate', () => {
      const oldCandidate: Candidate = {
        candidateName: {
          firstName: 'Jane',
          lastName: 'Doe',
        },
        driverNumber: 'doe888',
      };

      const result = candidateReducer(oldCandidate, new ChangeActiveCandidate(newCandidate));

      expect(result).toBe(newCandidate);
    });
  });
});
