import { testCentreReducer } from '../test-centre.reducer';
import { PopulateTestCentre } from '../test-centre.actions';
describe('testCentre reducer', function () {
    it('should return the testcentre from a populate test centre action', function () {
        var mockTestCentre = {
            centreId: 1,
            costCode: '1234',
        };
        var result = testCentreReducer(null, new PopulateTestCentre(mockTestCentre));
        expect(result).toBe(mockTestCentre);
    });
});
//# sourceMappingURL=test-centre.reducer.spec.js.map