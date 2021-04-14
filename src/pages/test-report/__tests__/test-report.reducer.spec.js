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
import { testReportReducer, initialState } from '../test-report.reducer';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../test-report.actions';
describe('TestReportReducer reducer', function () {
    describe('TOGGLE_SERIOUS_FAULT_MODE', function () {
        it('should enable serious fault mode', function () {
            var result = testReportReducer(initialState, new ToggleSeriousFaultMode());
            expect(result.seriousMode).toEqual(true);
        });
        it('should disable serious fault mode', function () {
            var state = __assign(__assign({}, initialState), { seriousMode: true });
            var result = testReportReducer(state, new ToggleSeriousFaultMode());
            expect(result.seriousMode).toEqual(false);
        });
    });
    describe('TOGGLE_DANGEROUS_FAULT_MODE', function () {
        it('should enable dangerous fault mode', function () {
            var result = testReportReducer(initialState, new ToggleDangerousFaultMode());
            expect(result.dangerousMode).toEqual(true);
        });
        it('should disable dangerous fault mode', function () {
            var state = __assign(__assign({}, initialState), { dangerousMode: true });
            var result = testReportReducer(state, new ToggleDangerousFaultMode());
            expect(result.dangerousMode).toEqual(false);
        });
    });
});
//# sourceMappingURL=test-report.reducer.spec.js.map