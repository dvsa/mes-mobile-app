import { testStatusReducer } from '../test-status.reducer';
import { TestStatus } from '../test-status.model';
import { SetTestStatusBooked, SetTestStatusStarted, SetTestStatusDecided, SetTestStatusCompleted, SetTestStatusSubmitted, } from '../test-status.actions';
describe('test status reducer', function () {
    var _a;
    var slotId = '1003';
    var initialState = (_a = {},
        _a[slotId] = '',
        _a);
    it('shoule move test status to booked when SetTestStatusBooked', function () {
        var result = testStatusReducer(initialState, new SetTestStatusBooked(slotId));
        expect(result[slotId]).toBe(TestStatus.Booked);
    });
    it('should move the test to started when receiving the SetTestStatusStarted action', function () {
        var result = testStatusReducer(initialState, new SetTestStatusStarted(slotId));
        expect(result[slotId]).toBe(TestStatus.Started);
    });
    it('should change the test to decided when receiving the TestStatusDecided action', function () {
        var result = testStatusReducer(initialState, new SetTestStatusDecided(slotId));
        expect(result[slotId]).toBe(TestStatus.Decided);
    });
    it('should change the test to completed when receiving the TestStatusCompleted action', function () {
        var result = testStatusReducer(initialState, new SetTestStatusCompleted(slotId));
        expect(result[slotId]).toBe(TestStatus.Completed);
    });
    it('should change the test to submitted when receiving the TestStatusSubmitted action', function () {
        var result = testStatusReducer(initialState, new SetTestStatusSubmitted(slotId));
        expect(result[slotId]).toBe(TestStatus.Submitted);
    });
});
//# sourceMappingURL=test-status.reducer.spec.js.map