import { isFailed, isPassed } from '../eyesight-test-result.selector';

describe('eyesight test result selector', () => {
  describe('isFailed', () => {
    it('should return true if the eyesight result is a failure, false otherwise', () => {
      expect(isFailed('F')).toEqual(true);
      expect(isFailed('P')).toEqual(false);
      expect(isFailed(null)).toEqual(false);
    });
  });
  describe('isPassed', () => {
    it('should return true if the eyesight result is a pass, false otherwise', () => {
      expect(isPassed('P')).toEqual(true);
      expect(isPassed('F')).toEqual(false);
      expect(isPassed(null)).toEqual(false);
    });
  });
});
