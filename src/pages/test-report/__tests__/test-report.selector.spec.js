import { isSeriousMode, isDangerousMode } from '../test-report.selector';
describe('TestReportSelectors', function () {
    var state = {
        seriousMode: true,
        dangerousMode: true,
        removeFaultMode: true,
    };
    describe('isSeriousMode', function () {
        it('should return true if the test report is in serious mode', function () {
            expect(isSeriousMode(state)).toEqual(true);
        });
    });
    describe('isDangerousMode', function () {
        it('should return true if the test report is in dangerous mode', function () {
            expect(isDangerousMode(state)).toEqual(true);
        });
    });
});
//# sourceMappingURL=test-report.selector.spec.js.map