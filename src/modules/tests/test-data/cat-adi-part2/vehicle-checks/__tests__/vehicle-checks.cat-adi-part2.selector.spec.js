import { getVehicleChecksDangerous, getVehicleChecksSerious, vehicleChecksExist, } from '../vehicle-checks.cat-adi-part2.selector';
describe('Vehicle Checks Selector Cat ADI2', function () {
    describe('getVehicleChecksSerious', function () {
        it('should return false if there are no serious vehicle checks recorded', function () {
            var emptySerious = { seriousFault: false };
            var result = getVehicleChecksSerious(emptySerious);
            expect(result).toBe(false);
        });
        it('should return true if there are serious vehicle checks recorded', function () {
            var serious = { seriousFault: true };
            var result = getVehicleChecksSerious(serious);
            expect(result).toBe(true);
        });
    });
    describe('getVehicleChecksDangerous', function () {
        it('should return false if there are no dangerous vehicle checks recorded', function () {
            var emptyDangerous = { dangerousFault: false };
            var result = getVehicleChecksDangerous(emptyDangerous);
            expect(result).toBe(false);
        });
        it('should return true if there are dangerous vehicle checks recorded', function () {
            var dangerous = { dangerousFault: true };
            var result = getVehicleChecksDangerous(dangerous);
            expect(result).toBe(true);
        });
    });
    describe('vehicleChecksExist', function () {
        it('should return false if there are no vehicle checks entered', function () {
            var emptyVehicleChecks = { tellMeQuestions: [{}] };
            var result = vehicleChecksExist(emptyVehicleChecks);
            expect(result).toBeFalsy();
        });
        it('should return true if there are vehicle checks (tellMeQuestions) entered', function () {
            var populatedVehicleChecks = {
                tellMeQuestions: [{ code: 'T01', description: 'test T01', outcome: 'DF' }],
            };
            var result = vehicleChecksExist(populatedVehicleChecks);
            expect(result).toBeTruthy();
        });
        it('should return false if there are vehicle checks but no outcome selected', function () {
            var populatedVehicleChecks = {
                tellMeQuestions: [{ code: 'T01', description: 'test T01', outcome: null }],
            };
            var result = vehicleChecksExist(populatedVehicleChecks);
            expect(result).toBeFalsy();
        });
    });
});
//# sourceMappingURL=vehicle-checks.cat-adi-part2.selector.spec.js.map