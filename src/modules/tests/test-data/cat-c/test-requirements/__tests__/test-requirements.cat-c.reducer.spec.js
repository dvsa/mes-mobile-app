import { testRequirementsCatCReducer } from '../test-requirements.cat-c.reducer';
import { LegalRequirements } from '../../../test-data.constants';
import { ToggleLegalRequirement } from '../../../common/test-requirements/test-requirements.actions';
describe('Test Requirements CAT C Reducer', function () {
    describe('TOGGLE_LEGAL_REQUIREMENT', function () {
        it('should toggle uphill start to complete(true) when dispatched first time', function () {
            var state = {};
            var result = testRequirementsCatCReducer(state, new ToggleLegalRequirement(LegalRequirements.uphillStart));
            expect(result[LegalRequirements.uphillStart]).toEqual(true);
        });
        it('should toggle uphill start to incomplete(false) when dispatched second time', function () {
            var state = {};
            var modifiedState = testRequirementsCatCReducer(state, new ToggleLegalRequirement(LegalRequirements.uphillStart));
            var result = testRequirementsCatCReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.uphillStart));
            expect(result[LegalRequirements.uphillStart]).toEqual(false);
        });
    });
});
//# sourceMappingURL=test-requirements.cat-c.reducer.spec.js.map