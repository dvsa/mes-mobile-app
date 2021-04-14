import { getRegistrationNumber, getGearboxCategory, } from '../../common/vehicle-details.selector';
import { getSchoolCar, getDualControls, } from '../vehicle-details.cat-b.selector';
describe('vehicle details selector', function () {
    var state = {
        dualControls: true,
        gearboxCategory: 'Manual',
        registrationNumber: '11AAA',
        schoolCar: false,
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
    describe('getSchoolCar', function () {
        it('should retrieve the school car indicator from the vehicle details', function () {
            expect(getSchoolCar(state)).toBe(false);
        });
    });
    describe('getDualControls', function () {
        it('should retrieve the dual controls indicator from the vehicle details', function () {
            expect(getDualControls(state)).toBe(true);
        });
    });
});
//# sourceMappingURL=vehicle-details.selector.spec.js.map