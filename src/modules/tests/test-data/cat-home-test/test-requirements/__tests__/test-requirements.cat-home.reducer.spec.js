import { testRequirementsCatHomeReducer } from '../test-requirements.cat-home.reducer';
import { LegalRequirements } from '../../../test-data.constants';
import { ToggleLegalRequirement } from '../../../common/test-requirements/test-requirements.actions';
describe('Test Requirements CAT Home Reducer', function () {
    describe('TOGGLE_LEGAL_REQUIREMENT', function () {
        it('should toggle angled start to complete(true) when dispatched first time', function () {
            var state = {};
            var result = testRequirementsCatHomeReducer(state, new ToggleLegalRequirement(LegalRequirements.angledStart));
            expect(result[LegalRequirements.angledStart]).toEqual(true);
        });
        it('should toggle angled start to incomplete(false) when dispatched second time', function () {
            var state = {};
            var modifiedState = testRequirementsCatHomeReducer(state, new ToggleLegalRequirement(LegalRequirements.angledStart));
            var result = testRequirementsCatHomeReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.angledStart));
            expect(result[LegalRequirements.angledStart]).toEqual(false);
        });
    });
});
//# sourceMappingURL=test-requirements.cat-home.reducer.spec.js.map