import { isNonBlankString } from '../string-utils';

describe('string-utils', () => {
  describe('isNonBlankString', () => {
    it('should return true only for strings with visible text, false otherwise', () => {
      const cases = [
        { input: undefined, expected: false },
        { input: null, expected: false },
        { input: true, expected: false },
        { input: false, expected: false },
        { input: 3, expected: false },
        { input: -3.5, expected: false },
        { input: '', expected: false },
        { input: '   ', expected: false },
        { input: 'a', expected: true },
        { input: '   abc  ', expected: true }
      ];
      cases.forEach((testCase) => {
        expect(isNonBlankString(testCase.input)).toBe(testCase.expected);
      });
    });
  });
});
