import { examinerKeyedReducer } from '../examiner-keyed.reducer';
import { SetExaminerKeyed } from '../examiner-keyed.actions';
describe('examinerKeyedReducer', function () {
    it('should return the correct value ', function () {
        var result = examinerKeyedReducer(null, new SetExaminerKeyed(123456));
        expect(result).toBe(123456);
    });
});
//# sourceMappingURL=examiner-keyed.reducer.spec.js.map