import { getDrivingOrRidingLabel } from '../driver-type';
describe('getDrivingOrRidingLabel()', function () {
    it('should return riding when a category equals EUAM1,', function () {
        var driverType = getDrivingOrRidingLabel("EUAM1" /* EUAM1 */);
        expect(driverType).toEqual('riding');
    });
    it('should return riding when a category equals EUA1M2,', function () {
        var driverType = getDrivingOrRidingLabel("EUA1M2" /* EUA1M2 */);
        expect(driverType).toEqual('riding');
    });
    it('should return driving when a category equals B', function () {
        var driverType = getDrivingOrRidingLabel("B" /* B */);
        expect(driverType).toEqual('driving');
    });
    it('should return driving when a category equals BE', function () {
        var driverType = getDrivingOrRidingLabel("B+E" /* BE */);
        expect(driverType).toEqual('driving');
    });
});
//# sourceMappingURL=driver-type.spec.js.map