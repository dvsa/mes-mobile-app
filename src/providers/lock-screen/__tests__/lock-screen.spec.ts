import { TestBed } from '@angular/core/testing';
import { LockScreenProvider } from '../lock-screen';
import { LockScreenProviderMock } from '../__mocks__/lock-screen.mock';

describe('Lock Screen Provider', () => {

  let lockScreenProvider: LockScreenProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
                { provide: LockScreenProvider, useClass: LockScreenProviderMock },
      ],
    });

    lockScreenProvider = TestBed.get(LockScreenProvider);
  });

  describe('triggerLockScreen', () => {
    it('should return true when successfully authenticated', async () => {
      const result = await lockScreenProvider.triggerLockScreen();
      expect(result).toBe(true);
    });
  });

});
