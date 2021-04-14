import { etaReducer } from '../eta.reducer';
import { ToggleETA } from '../eta.actions';
import { ExaminerActions } from '../../../test-data.constants';
describe('ETA Reducer', function () {
    describe('TOGGLE_ETA', function () {
        it('should toggle ETA verbal to true when dispatched first time', function () {
            var state = {};
            var result = etaReducer(state, new ToggleETA(ExaminerActions.verbal));
            expect(result.verbal).toEqual(true);
        });
        it('should toggle ETA verbal to false when dispatched second time', function () {
            var state = {};
            var modifiedState = etaReducer(state, new ToggleETA(ExaminerActions.verbal));
            var result = etaReducer(modifiedState, new ToggleETA(ExaminerActions.verbal));
            expect(result.verbal).toEqual(false);
        });
        it('should toggle ETA physical to true when dispatched first time', function () {
            var state = {};
            var result = etaReducer(state, new ToggleETA(ExaminerActions.physical));
            expect(result.physical).toBe(true);
        });
        it('should toggle ETA physical to false when dispatched second time', function () {
            var state = {};
            var modifiedState = etaReducer(state, new ToggleETA(ExaminerActions.physical));
            var result = etaReducer(modifiedState, new ToggleETA(ExaminerActions.physical));
            expect(result.physical).toEqual(false);
        });
    });
});
//# sourceMappingURL=eta.reducer.spec.js.map