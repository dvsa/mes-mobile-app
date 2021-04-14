import { getCostCentre } from '../test-centre.selector';
describe('testCentre selector', function () {
    var testCentre = {
        centreId: 1,
        costCode: '1234',
    };
    describe('getCostCentre', function () {
        it('should return the cost centre', function () {
            expect(getCostCentre(testCentre)).toBe('1234');
        });
    });
});
//# sourceMappingURL=test-centre.selector.spec.js.map