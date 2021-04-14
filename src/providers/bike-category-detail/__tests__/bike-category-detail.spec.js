import { BikeCategoryDetailProvider } from '../bike-category-detail';
import { BikeTestType } from '../bike-category-detail.model';
describe('BikeCategoryDetailProvider', function () {
    var provider;
    beforeEach(function () {
        provider = new BikeCategoryDetailProvider();
    });
    describe('getDetailByCategoryCode()', function () {
        it('should return a single category detail object for the provided category code', function () {
            var bikeDetail = provider.getDetailByCategoryCode('EUAMM1');
            expect(bikeDetail.imageUrl).toEqual('assets/imgs/bike-category-icons/AM.png');
            expect(bikeDetail.displayId).toEqual('AM');
            expect(bikeDetail.displayName).toEqual('Moped');
        });
    });
    describe('getAllDetailsByTestType()', function () {
        it('should return all matching bike details for a specified test type ', function () {
            var bikeDetails = provider.getAllDetailsByTestType(BikeTestType.MOD1);
            expect(bikeDetails.length).toEqual(4);
        });
    });
});
//# sourceMappingURL=bike-category-detail.spec.js.map