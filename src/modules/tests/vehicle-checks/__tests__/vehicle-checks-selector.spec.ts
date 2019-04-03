import { VehicleChecks, QuestionOutcome } from '@dvsa/mes-test-schema/categories/B';
import {
  isTellMeQuestionSelected,
  isTellMeQuestionCorrect,
  isTellMeQuestionDrivingFault,
} from '../vehicle-checks.selector';

describe('vehicle checks selector', () => {
  describe('isTellMeQuestionSelected', () => {
    it('should return true if there is a tell me question selected', () => {
      const state: VehicleChecks = {
        tellMeQuestionCode: 'T1',
        tellMeQuestionDescription: 'desc',
        tellMeQuestionOutcome: 'P',
      };
      expect(isTellMeQuestionSelected(state)).toBe(true);
    });
    it('should return false if there is no tell me question selected', () => {
      expect(isTellMeQuestionSelected({})).toBe(false);
    });
  });
  describe('isTellMeQuestionCorrect', () => {
    const passedState: VehicleChecks = {
      tellMeQuestionCode: 'T1',
      tellMeQuestionDescription: 'desc',
      tellMeQuestionOutcome: 'P',
    };

    it('should return true if the tell me question is marked as a pass', () => {
      expect(isTellMeQuestionCorrect(passedState)).toBe(true);
    });
    it('should return false if the tell me question is marked as a driving fault', () => {
      const failedState = {
        ...passedState,
        tellMeQuestionOutcome: 'DF' as QuestionOutcome,
      };
      expect(isTellMeQuestionCorrect(failedState)).toBe(false);
    });
  });
  describe('isTellMeQuestionDrivingFault', () => {
    const faultState: VehicleChecks = {
      tellMeQuestionCode: 'T1',
      tellMeQuestionDescription: 'desc',
      tellMeQuestionOutcome: 'DF',
    };

    it('should return true if the tell me question is marked as a pass', () => {
      expect(isTellMeQuestionDrivingFault(faultState)).toBe(true);
    });
    it('should return false if the tell me question is marked as a driving fault', () => {
      const passedState = {
        ...faultState,
        tellMeQuestionOutcome: 'P' as QuestionOutcome,
      };
      expect(isTellMeQuestionDrivingFault(passedState)).toBe(false);
    });
  });
});
