import { getVehicleLength, getVehicleWidth } from '../vehicle-details.cat-be.selector';
describe('vehicle details CAT BE selector', function () {
    var state = {
        vehicleLength: 10,
        vehicleWidth: 3.5,
    };
    describe('getVehicleLength', function () {
        it('should retrieve vehicle length from the vehicle details', function () {
            expect(getVehicleLength(state)).toBe(10);
        });
    });
    describe('getVehicleWidth', function () {
        it('should retrieve the vehicle width from the vehicle details', function () {
            expect(getVehicleWidth(state)).toBe(3.5);
        });
    });
});
//# sourceMappingURL=vehicle-details.cat-be.selector.spec.js.map