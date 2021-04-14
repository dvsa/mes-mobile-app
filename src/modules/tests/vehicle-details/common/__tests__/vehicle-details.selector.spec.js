import { getRegistrationNumber, getGearboxCategory, } from '../../common/vehicle-details.selector';
describe('vehicle details selector', function () {
    var state = {
        gearboxCategory: 'Manual',
        registrationNumber: '11AAA',
    };
    describe('getRegistrationNumber', function () {
        it('should retrieve the registration number from the vehicle details', function () {
            expect(getRegistrationNumber(state)).toBe('11AAA');
        });
    });
    describe('getGearboxCategory', function () {
        it('should retrieve the gearbox category from the vehicle details', function () {
            expect(getGearboxCategory(state)).toBe('Manual');
        });
    });
});
//# sourceMappingURL=vehicle-details.selector.spec.js.map