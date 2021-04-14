import { candidateReducer } from '../candidate.reducer';
import { PopulateCandidateDetails } from '../candidate.actions';
import { candidateMock } from '../../../../__mocks__/tests.mock';
describe('candidate reducer', function () {
    it('should return the candidate from a start test action', function () {
        var result = candidateReducer(null, new PopulateCandidateDetails(candidateMock));
        expect(result).toBe(candidateMock);
    });
});
//# sourceMappingURL=candidate.reducer.spec.js.map