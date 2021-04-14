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
import { initialState, emergencyStopReducer } from '../emergency-stop.reducer';
import * as emergencyStopActions from '../emergency-stop.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('emergency stop reducer', function () {
    describe('handle serious fault', function () {
        it('should set outcome to S', function () {
            var state = __assign({}, initialState);
            var action = new emergencyStopActions.AddEmergencyStopSeriousFault();
            var result = emergencyStopReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { outcome: CompetencyOutcome.S }));
        });
        it('should set outcome to null', function () {
            var state = __assign(__assign({}, initialState), { outcome: CompetencyOutcome.S });
            var action = new emergencyStopActions.RemoveEmergencyStopSeriousFault();
            var result = emergencyStopReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { outcome: null }));
        });
    });
    describe('handle RecordEmergencyStopFirstAttempt', function () {
        it('should set the firstAttempt to attemptedSpeed', function () {
            var state = __assign({}, initialState);
            var attemptedSpeed = 48;
            var action = new emergencyStopActions.RecordEmergencyStopFirstAttempt(attemptedSpeed);
            var result = emergencyStopReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { firstAttempt: attemptedSpeed }));
        });
    });
    describe('handle RecordEmergencyStopSecondAttempt', function () {
        it('should set the secondAttempt to attemptedSpeed', function () {
            var state = __assign({}, initialState);
            var attemptedSpeed = 48;
            var action = new emergencyStopActions.RecordEmergencyStopSecondAttempt(attemptedSpeed);
            var result = emergencyStopReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { secondAttempt: attemptedSpeed }));
        });
    });
});
//# sourceMappingURL=emergency-stop.reducer.spec.js.map