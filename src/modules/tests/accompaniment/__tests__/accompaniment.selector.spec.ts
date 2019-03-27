import { Accompaniment } from '@dvsa/mes-test-schema/categories/B';
import {
  getInstructorAccompaniment,
  getSupervisorAccompaniment,
  getOtherAccompaniment,
} from '../accompaniment.selector';

describe('accompaniment selector', () => {
  const state: Accompaniment = {
    ADI: false,
    other: true,
    supervisor: false,
  };

  describe('getInstructorAccompaniment', () => {
    it('should retrive the instructor accompaniment indicator from the state', () => {
      expect(getInstructorAccompaniment(state)).toBe(false);
    });
  });

  describe('getSupervisorAccompaniment', () => {
    it('should retrive the supervisor accompaniment indicator from the state', () => {
      expect(getSupervisorAccompaniment(state)).toBe(false);
    });
  });

  describe('getotherAccompaniment', () => {
    it('should retrive the other accompaniment indicator from the state', () => {
      expect(getOtherAccompaniment(state)).toBe(true);
    });
  });
});
