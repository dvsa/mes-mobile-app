import { instructorDetailsReducer } from '../instructor-details.reducer';
import { InstructorRegistrationNumberChanged } from '../instructor-details.actions';
describe('instructor details reducer', function () {
    it('should place the registration number from the change action into the state', function () {
        var result = instructorDetailsReducer({}, new InstructorRegistrationNumberChanged(123));
        expect(result.registrationNumber).toBe(123);
    });
});
//# sourceMappingURL=instructor-details.reducer.spec.js.map