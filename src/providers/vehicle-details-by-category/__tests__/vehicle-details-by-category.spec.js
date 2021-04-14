import { VehicleDetailsByCategoryProvider } from '../vehicle-details-by-category';
import { getVehicleDetails } from '../../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.reducer';
import { getVehicleLength, getVehicleWidth, } from '../../../modules/tests/vehicle-details/cat-c/vehicle-details.cat-c.selector';
describe('VehicleDetailsByCategoryProvider', function () {
    var provider;
    beforeEach(function () {
        provider = new VehicleDetailsByCategoryProvider();
    });
    describe('getVehicleDetailsByCategoryCode', function () {
        it('should return Cat C vehicle details for a C category code', function () {
            expect(function () {
                var vehicleData = provider.getVehicleDetailsByCategoryCode("C" /* C */);
                expect(vehicleData).toEqual({
                    vehicleDetails: getVehicleDetails,
                    vehicleLength: getVehicleLength,
                    vehicleWidth: getVehicleWidth,
                });
            }).not.toThrowError('Error getting test category vehicle details');
        });
        it('should throw an error when there is no matching test category', function () {
            expect(function () {
                provider.getVehicleDetailsByCategoryCode('z');
            }).toThrowError('Error getting test category vehicle details');
        });
        it('should throw an error when test category is undefined', function () {
            expect(function () {
                provider.getVehicleDetailsByCategoryCode(undefined);
            }).toThrowError('Error getting test category vehicle details');
        });
    });
});
//# sourceMappingURL=vehicle-details-by-category.spec.js.map