import { getInsuranceDeclarationStatus, getResidencyDeclarationStatus } from '../waiting-room.selector';
import { WaitingRoom } from '@dvsa/mes-test-schema/CatBTest';

describe('Waiting room selector', () => {
  const state: WaitingRoom = {
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
});
