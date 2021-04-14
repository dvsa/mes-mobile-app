import { examinerReducer } from '../examiner.reducer';
import { PopulateExaminer } from '../examiner.actions';
describe('examiner reducer', function () {
    it('should return the examiner from a populate examiner', function () {
        var mockExaminer = {
            staffNumber: '1234',
        };
        var result = examinerReducer(null, new PopulateExaminer(mockExaminer));
        expect(result).toBe(mockExaminer);
    });
});
//# sourceMappingURL=examiner.reducer.spec.js.map