import { testRequirementsReducer } from '../test-requirements.reducer';
import { LegalRequirements } from '../../../test-data.constants';
import { ToggleLegalRequirement } from '../../../common/test-requirements/test-requirements.actions';
import { TestRequirements } from '@dvsa/mes-test-schema/categories/common';

describe('Test Requirements Reducer', () => {

  describe('TOGGLE_LEGAL_REQUIREMENT', () => {
    it('should toggle normal start 1 to complete (true) when dispatched first time', () => {
      const state: TestRequirements = {};
      const result = testRequirementsReducer(
        state,
        new ToggleLegalRequirement(LegalRequirements.normalStart1),
      );
      expect(result.normalStart1).toEqual(true);
    });
    it('should toggle normal start 1 to incomplete (false) when dispatched second time', () => {
      const state: TestRequirements = {};
      const modifiedState = testRequirementsReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart1));
      const result = testRequirementsReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.normalStart1));
      expect(result.normalStart1).toEqual(false);
    });
  });
});
