import {
  getCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
  getUntitledCandidateName,
  getPostalAddress,
  formatAddress,
} from '../candidate.selector';
import { Candidate } from '@dvsa/mes-test-schema/categories/B';

describe('candidate selector', () => {
  const candidate: Candidate = {
    candidateName: {
      firstName: 'Joe',
      lastName: 'Bloggs',
      title: 'Mr',
    },
    driverNumber: '123',
    candidateAddress: {
      addressLine1: '1 Example Street',
      addressLine2: '456 Market Square',
      addressLine3: 'Nottingham',
      addressLine4: 'East Midlands',
      addressLine5: 'United Kingdom',
      postcode: 'NG1 6HY',
    },
  };
  describe('getCandidateName', () => {
    it('should produce first and last name with a title prefix', () => {
      expect(getCandidateName(candidate)).toBe('Mr Joe Bloggs');
    });
  });

  describe('getUntitledCandidateName', () => {
    it('should produce first and last name only, no title prefix', () => {
      expect(getUntitledCandidateName(candidate)).toBe('Joe Bloggs');
    });
  });

  describe('getCandidateDriverNumber', () => {
    it('should extract the driver number', () => {
      expect(getCandidateDriverNumber(candidate)).toBe('123');
    });
  });

  describe('formatDriverNumber', () => {
    it('should output the driver number as-is where it is not long enough', () => {
      expect(formatDriverNumber('123')).toBe('123');
    });
    it('should output the driver number in 3 space separated parts where applicable', () => {
      expect(formatDriverNumber('ABCDE123456Z78YX')).toBe('ABCDE 123456 Z78YX');
    });
  });

  describe('getPostalAddress', () => {
    it('should output the address', () => {
      expect(getPostalAddress(candidate).addressLine1).toEqual('1 Example Street');
      expect(getPostalAddress(candidate).addressLine2).toEqual('456 Market Square');
      expect(getPostalAddress(candidate).addressLine3).toEqual('Nottingham');
      expect(getPostalAddress(candidate).addressLine4).toEqual('East Midlands');
      expect(getPostalAddress(candidate).addressLine5).toEqual('United Kingdom');
      expect(getPostalAddress(candidate).postcode).toEqual('NG1 6HY');
    });
  });
  describe('formatAddress', () => {
    it('should output the address replacing numbers with x`s', () => {
      const formatted = formatAddress(candidate.candidateAddress);
      expect(formatted.addressLine1).toEqual('x Example Street');
      expect(formatted.addressLine2).toEqual('xxx Market Square');
      expect(formatted.addressLine3).toEqual('Nottingham');
      expect(formatted.addressLine4).toEqual('East Midlands');
      expect(formatted.addressLine5).toEqual('United Kingdom');
      expect(formatted.postcode).toEqual('NGx xHY');
    });
  });
});
