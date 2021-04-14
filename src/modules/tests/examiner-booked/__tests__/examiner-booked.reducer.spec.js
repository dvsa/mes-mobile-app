import { examinerBookedReducer } from '../examiner-booked.reducer';
import { SetExaminerBooked } from '../examiner-booked.actions';
describe('examinerBookedReducer', function () {
    it('should return the correct value ', function () {
        var result = examinerBookedReducer(null, new SetExaminerBooked(123456));
        expect(result).toBe(123456);
    });
});
//# sourceMappingURL=examiner-booked.reducer.spec.js.map