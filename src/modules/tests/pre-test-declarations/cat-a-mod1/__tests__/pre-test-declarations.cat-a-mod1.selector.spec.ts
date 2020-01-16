import { getcbtNumberStatus } from '../pre-test-declarations.cat-a-mod1.selector';
import { PreTestDeclarations } from '@dvsa/mes-test-schema/categories/AM1/index';

describe('PreTestDeclarations selector', () => {
  const state: PreTestDeclarations = {
    DL196CBTCertNumber: '1234567',
    insuranceDeclarationAccepted: true,
    residencyDeclarationAccepted: false,
    preTestSignature: 'sig',
  };

  describe('getcbtNumberStatus', () => {
    it('should retrieve the cbt number', () => {
      expect(getcbtNumberStatus(state)).toBe('1234567');
    });
  });
});
