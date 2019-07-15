import { TestBed } from '@angular/core/testing';
import { CandidateDetailsCheckProvider } from '../candidate-details-check';

describe('CandidateDetailsCheckProvider', () => {

  let candidateDetailsCheck: CandidateDetailsCheckProvider;
  const slotId = 1234567;
  const anotherSlotId = 7654321;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CandidateDetailsCheckProvider,
      ],
    });

    candidateDetailsCheck = TestBed.get(CandidateDetailsCheckProvider);
  });

  describe('candidateDetailsCheck', () => {
    it('candidate details not seen should return false', (done) => {
      const result = candidateDetailsCheck.isCandidateDetailsSeen(slotId);
      expect(result).toBe(false);
      done();
    });
    it('candidate details seen should return true', (done) => {
      candidateDetailsCheck.candidateDetailsViewed(slotId);
      const result = candidateDetailsCheck.isCandidateDetailsSeen(slotId);
      expect(result).toBe(true);
      done();
    });
    it('candidate details seen once should always return true', (done) => {
      candidateDetailsCheck.candidateDetailsViewed(slotId);
      expect(candidateDetailsCheck.isCandidateDetailsSeen(slotId)).toBe(true);
      expect(candidateDetailsCheck.isCandidateDetailsSeen(slotId)).toBe(true);
      done();
    });
    it('another candidate details seen should return false', (done) => {
      candidateDetailsCheck.candidateDetailsViewed(anotherSlotId);
      const result = candidateDetailsCheck.isCandidateDetailsSeen(slotId);
      expect(result).toBe(false);
      done();
    });
  });
});
