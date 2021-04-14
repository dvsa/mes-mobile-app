import { examinerConductedReducer } from '../examiner-conducted.reducer';
import { SetExaminerConducted } from '../examiner-conducted.actions';
describe('examinerConductedReducer', function () {
    it('should return the correct value ', function () {
        var result = examinerConductedReducer(null, new SetExaminerConducted(123456));
        expect(result).toBe(123456);
    });
});
//# sourceMappingURL=examiner-conducted.reducer.spec.js.map