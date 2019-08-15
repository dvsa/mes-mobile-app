import { removeLeadingZeros } from '../formatters';

describe('Formatters', () => {

  describe('removeLeadingZeros', () => {
    it('should remove leading zeros if there are any', () => {
      expect(removeLeadingZeros('01234567')).toEqual('1234567');
      expect(removeLeadingZeros('0000001234567')).toEqual('1234567');
    });
    it('should not remove leading zeros if there aren=t any', () => {
      expect(removeLeadingZeros('abcdef')).toEqual('abcdef');
      expect(removeLeadingZeros('123450123')).toEqual('123450123');
    });
  });

});
