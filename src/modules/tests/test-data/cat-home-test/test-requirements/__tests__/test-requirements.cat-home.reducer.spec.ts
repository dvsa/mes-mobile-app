import { testRequirementsCatHomeReducer } from '../test-requirements.cat-home.reducer';
import { LegalRequirements } from '../../../test-data.constants';
import { ToggleLegalRequirement } from '../../../common/test-requirements/test-requirements.actions';
import { TestRequirements } from '@dvsa/mes-test-schema/categories/common';

describe('Test Requirements CAT Home Reducer', () => {

  describe('TOGGLE_LEGAL_REQUIREMENT', () => {
    it('should angled start to complete(true) when dispatched first time', () => {
      const state: TestRequirements = {};
      const result = testRequirementsCatHomeReducer(
        state,
        new ToggleLegalRequirement(LegalRequirements.angledStart),
      );
      expect(result[LegalRequirements.angledStart]).toEqual(true);
    });

    it('should toggle angled start to incomplete(false) when dispatched second time', () => {
      const state: TestRequirements = {};
      const modifiedState = testRequirementsCatHomeReducer(
        state, new ToggleLegalRequirement(LegalRequirements.angledStart));
      const result = testRequirementsCatHomeReducer(
        modifiedState, new ToggleLegalRequirement(LegalRequirements.angledStart));
      expect(result[LegalRequirements.angledStart]).toEqual(false);
    });
  });
});
