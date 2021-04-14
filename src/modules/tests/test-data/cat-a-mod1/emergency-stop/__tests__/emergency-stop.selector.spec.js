import { getEmergencyStop } from '../emergency-stop.selector';
describe('emergency stop selector', function () {
    describe('getEmergencyStop', function () {
        it('should return emergencyStop from testData', function () {
            var testData = {
                emergencyStop: {
                    firstAttempt: 44,
                    secondAttempt: 50,
                },
            };
            var result = getEmergencyStop(testData);
            expect(result).toBe(testData.emergencyStop);
        });
    });
});
//# sourceMappingURL=emergency-stop.selector.spec.js.map