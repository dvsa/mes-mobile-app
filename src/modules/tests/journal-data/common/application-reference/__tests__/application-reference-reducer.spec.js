import { applicationReferenceReducer } from '../application-reference.reducer';
import { PopulateApplicationReference } from '../application-reference.actions';
describe('application reference reducer', function () {
    it('should return the application reference from a start test action', function () {
        var mockApplication = {
            applicationId: 1234567,
            bookingSequence: 8,
            checkDigit: 9,
        };
        var result = applicationReferenceReducer(null, new PopulateApplicationReference(mockApplication));
        expect(result).toEqual(mockApplication);
    });
});
//# sourceMappingURL=application-reference-reducer.spec.js.map