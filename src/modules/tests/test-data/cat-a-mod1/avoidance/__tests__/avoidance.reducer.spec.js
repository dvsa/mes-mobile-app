var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { initialState, avoidanceReducer } from '../avoidance.reducer';
import * as avoidanceActions from '../avoidance.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('avoidance reducer', function () {
    describe('handle ToggleEmergencyStopSpeedReq', function () {
        it('should set outcome to S', function () {
            var state = __assign({}, initialState);
            var action = new avoidanceActions.AddAvoidanceSeriousFault();
            var result = avoidanceReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { outcome: CompetencyOutcome.S }));
        });
        it('should set outcome to null', function () {
            var state = __assign(__assign({}, initialState), { outcome: CompetencyOutcome.S });
            var action = new avoidanceActions.RemoveAvoidanceSeriousFault();
            var result = avoidanceReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { outcome: null }));
        });
    });
    describe('handle RecordAvoidanceFirstAttempt', function () {
        it('should set the firstAttempt to attemptedSpeed', function () {
            var state = __assign({}, initialState);
            var attemptedSpeed = 48;
            var action = new avoidanceActions.RecordAvoidanceFirstAttempt(attemptedSpeed);
            var result = avoidanceReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { firstAttempt: attemptedSpeed }));
        });
    });
    describe('handle RecordAvoidanceSecondAttempt', function () {
        it('should set the secondAttempt to attemptedSpeed', function () {
            var state = __assign({}, initialState);
            var attemptedSpeed = 48;
            var action = new avoidanceActions.RecordAvoidanceSecondAttempt(attemptedSpeed);
            var result = avoidanceReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { secondAttempt: attemptedSpeed }));
        });
    });
});
//# sourceMappingURL=avoidance.reducer.spec.js.map