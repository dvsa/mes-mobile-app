import { getStaffNumber  } from '../examiner.selector';
import { Examiner } from '@dvsa/mes-test-schema/categories/common';

describe('examiner selector', () => {
  const examiner: Examiner = {
    staffNumber: '1234',
  };

  describe('getStaffNumber', () => {
    it('should return the staff number', () => {
      expect(getStaffNumber(examiner)).toBe('1234');
    });
  });
});
