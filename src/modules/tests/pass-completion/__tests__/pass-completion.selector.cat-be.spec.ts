import { isCode78Present, getPassCertificateNumber, isProvisionalLicenseProvided,
  isProvisionalLicenseNotProvided, isCode78NotPresent } from '../pass-completion.cat-be.selector';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

describe('pass completion selector', () => {
  const state: CatBEUniqueTypes.PassCompletion = {
    provisionalLicenceProvided: true,
    passCertificateNumber: 'ABC123',
    code78Present: true,
  };

  describe('getPassCertificateNumber', () => {
    it('should retrieve the pass certificate number', () => {
      expect(getPassCertificateNumber(state)).toBe('ABC123');
    });
  });

  describe('provisionalLicenseProvided', () => {
    it('should retrieve whether the provisional license was provided', () => {
      expect(isProvisionalLicenseProvided(state)).toBe(true);
    });
  });

  describe('provisionalLicenseNotProvided', () => {
    it('should retrieve whether the provisional license was provided', () => {
      expect(isProvisionalLicenseNotProvided(state)).toBe(false);
    });
  });

  describe('code78Present', () => {
    it('should retrieve whether code78 is present', () => {
      expect(isCode78Present(state)).toBe(true);
    });
  });

  describe('code78NotPresent', () => {
    it('should retrieve whether code78 not present', () => {
      expect(isCode78NotPresent(state)).toBe(false);
    });
  });
});
