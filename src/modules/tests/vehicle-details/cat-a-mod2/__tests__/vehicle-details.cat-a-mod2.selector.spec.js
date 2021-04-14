import { getSchoolBike } from '../vehicle-details.cat-a-mod2.selector';
describe('vehicle details CAT A Mod 2 selector', function () {
    var state = {
        schoolBike: true,
    };
    describe('getSchoolBike', function () {
        it('should retrieve if the bike is a school one from the vehicle details', function () {
            expect(getSchoolBike(state)).toBe(true);
        });
    });
});
//# sourceMappingURL=vehicle-details.cat-a-mod2.selector.spec.js.map