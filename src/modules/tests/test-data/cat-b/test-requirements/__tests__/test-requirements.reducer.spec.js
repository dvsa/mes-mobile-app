import { testRequirementsReducer } from '../test-requirements.reducer';
import { LegalRequirements } from '../../../test-data.constants';
import { ToggleLegalRequirement } from '../../../common/test-requirements/test-requirements.actions';
describe('Test Requirements Reducer', function () {
    describe('TOGGLE_LEGAL_REQUIREMENT', function () {
        it('should toggle normal start 1 to complete (true) when dispatched first time', function () {
            var state = {};
            var result = testRequirementsReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart1));
            expect(result.normalStart1).toEqual(true);
        });
        it('should toggle normal start 1 to incomplete (false) when dispatched second time', function () {
            var state = {};
            var modifiedState = testRequirementsReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart1));
            var result = testRequirementsReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.normalStart1));
            expect(result.normalStart1).toEqual(false);
        });
    });
});
//# sourceMappingURL=test-requirements.reducer.spec.js.map