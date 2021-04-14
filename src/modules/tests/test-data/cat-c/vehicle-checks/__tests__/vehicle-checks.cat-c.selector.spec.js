import { vehicleChecksExist } from '../vehicle-checks.cat-c.selector';
describe('Vehicle Checks Selector Cat C', function () {
    describe('vehicleChecksExist', function () {
        it('should return false if there are no vehicle checks entered', function () {
            var emptyVehicleChecks = { showMeQuestions: [{}], tellMeQuestions: [{}] };
            var result = vehicleChecksExist(emptyVehicleChecks);
            expect(result).toBeFalsy();
        });
        it('should return true if there are vehicle checks (showMeQuestions) entered', function () {
            var populatedVehicleChecks = {
                showMeQuestions: [{ code: 'S01', description: 'test s01', outcome: 'P' }],
                tellMeQuestions: [{}],
            };
            var result = vehicleChecksExist(populatedVehicleChecks);
            expect(result).toBeTruthy();
        });
        it('should return true if there are vehicle checks (tellMeQuestions) entered', function () {
            var populatedVehicleChecks = {
                showMeQuestions: [{}],
                tellMeQuestions: [{ code: 'T01', description: 'test T01', outcome: 'DF' }],
            };
            var result = vehicleChecksExist(populatedVehicleChecks);
            expect(result).toBeTruthy();
        });
        it('should return false if there are vehicle checks but no outcome selected', function () {
            var populatedVehicleChecks = {
                showMeQuestions: [{ code: 'S01', description: 'test s01', outcome: null }],
                tellMeQuestions: [{ code: 'T01', description: 'test T01', outcome: null }],
            };
            var result = vehicleChecksExist(populatedVehicleChecks);
            expect(result).toBeFalsy();
        });
    });
});
//# sourceMappingURL=vehicle-checks.cat-c.selector.spec.js.map