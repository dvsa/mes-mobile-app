import {
  getCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
  getUntitledCandidateName,
} from '../candidate.selector';
import { Candidate } from '@dvsa/mes-test-schema/CatBTest';

describe('candidate selector', () => {
  const candidate: Candidate = {
    candidateName: {
      firstName: 'Joe',
      lastName: 'Bloggs',
      title: 'Mr',
    },
    driverNumber: '123',
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
      expect(formatDriverNumber('ABCDE123456Z78YX')).toBe('ABCDE 12345 6Z78YX');
    });
  });
});
