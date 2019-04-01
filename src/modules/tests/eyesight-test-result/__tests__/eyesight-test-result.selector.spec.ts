import { isFailed, isPassed } from '../eyesight-test-result.selector';

describe('eyesight test result selector', () => {
  describe('isFailed', () => {
    it('should return true if the eyesight result is a failure, false otherwise', () => {
      expect(isFailed('F')).toBeTruthy();
      expect(isFailed('P')).toBeFalsy();
      expect(isFailed(null)).toBeFalsy();
    });
  });
  describe('isPassed', () => {
    it('should return true if the eyesight result is a pass, false otherwise', () => {
      expect(isPassed('P')).toBeTruthy();
      expect(isPassed('F')).toBeFalsy();
      expect(isPassed(null)).toBeFalsy();
    });
  });
});
