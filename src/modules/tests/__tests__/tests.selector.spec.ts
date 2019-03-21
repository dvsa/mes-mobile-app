import { getCurrentTest } from '../tests.selector';

describe('testsSelector', () => {
  describe('getCurrentTest', () => {
    it('should return whichever test is the current one', () => {
      const test = {
        category: 'B',
        id: 'abc123',
      };
      const state = {
        tests: {
          123: test,
          current: {
            slotId: '123',
          },
        },
      };
      const result = getCurrentTest(state);

      expect(result).toBe(test);
    });
  });
});
