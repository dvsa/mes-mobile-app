import {
  getInsuranceDeclarationStatus,
  getResidencyDeclarationStatus,
  getSignatureStatus,
} from '../pre-test-declarations.selector';
import { PreTestDeclarations } from '@dvsa/mes-test-schema/CatBTest';

describe('PreTestDeclarations selector', () => {
  const state: PreTestDeclarations = {
    insuranceDeclarationAccepted: true,
    residencyDeclarationAccepted: false,
    signature: 'sig',
  };

  describe('getInsuranceDeclarationStatus', () => {
    it('should return the insurance declaration status', () => {
      expect(getInsuranceDeclarationStatus(state)).toBe(true);
    });
  });

  describe('getResidencyDeclarationStatus', () => {
    it('should return the residency declaration status', () => {
      expect(getResidencyDeclarationStatus(state)).toBe(false);
    });
  });

  describe('getSignatureStatus', () => {
    it('should return the signature status', () => {
      expect(getSignatureStatus(state)).toEqual('sig');
    });
  });
});
