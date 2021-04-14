import { testRequirementsCatDReducer } from '../test-requirements.cat-d.reducer';
import { LegalRequirements } from '../../../test-data.constants';
import { ToggleLegalRequirement } from '../../../common/test-requirements/test-requirements.actions';
describe('Test Requirements CAT D Reducer', function () {
    describe('TOGGLE_LEGAL_REQUIREMENT', function () {
        it('should toggle uphill start to complete(true) when dispatched first time', function () {
            var state = {};
            var result = testRequirementsCatDReducer(state, new ToggleLegalRequirement(LegalRequirements.uphillStart));
            expect(result[LegalRequirements.uphillStart]).toEqual(true);
        });
        it('should toggle uphill start to incomplete(false) when dispatched second time', function () {
            var state = {};
            var modifiedState = testRequirementsCatDReducer(state, new ToggleLegalRequirement(LegalRequirements.uphillStart));
            var result = testRequirementsCatDReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.uphillStart));
            expect(result[LegalRequirements.uphillStart]).toEqual(false);
        });
    });
});
//# sourceMappingURL=test-requirements.cat-d.reducer.spec.js.map