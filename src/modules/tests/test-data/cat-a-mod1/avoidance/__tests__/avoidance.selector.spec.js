import { getAvoidance, getAvoidanceAttempted } from '../avoidance.selector';
describe('emergency stop selector', function () {
    describe('getEmergencyStop', function () {
        it('should return emergencyStop from testData', function () {
            var testData = {
                avoidance: {
                    firstAttempt: 44,
                    secondAttempt: 50,
                },
            };
            var result = getAvoidance(testData);
            expect(result).toBe(testData.avoidance);
        });
    });
    describe('getAvoidanceAttempted', function () {
        it('should return false when first and second attempted are not set', function () {
            var testData = {
                avoidance: {},
            };
            var result = getAvoidanceAttempted(testData.avoidance);
            expect(result).toBe(false);
        });
        it('should return true when first attempt is set but second attempted is not', function () {
            var testData = {
                avoidance: {
                    firstAttempt: 54,
                },
            };
            var result = getAvoidanceAttempted(testData.avoidance);
            expect(result).toBe(true);
        });
        it('should return true when first and second attempted is set', function () {
            var testData = {
                avoidance: {
                    firstAttempt: 45,
                    secondAttempt: 51,
                },
            };
            var result = getAvoidanceAttempted(testData.avoidance);
            expect(result).toBe(true);
        });
    });
});
//# sourceMappingURL=avoidance.selector.spec.js.map