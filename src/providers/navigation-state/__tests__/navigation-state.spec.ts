import { TestBed } from '@angular/core/testing';
import { NavigationStateProvider } from '../navigation-state';
import { NavController } from 'ionic-angular';
import { REKEY_SEARCH_PAGE, JOURNAL_PAGE } from '../../../pages/page-names.constants';
import { NavControllerMock } from '../__mocks__/nav-controller.mock';

fdescribe('NavigationStateProvider', () => {
  describe('getVersionNumber', () => {
    let navigationStateProvider: NavigationStateProvider;
    let navController: NavController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          NavigationStateProvider,
          { provide: NavController, useClass: NavControllerMock },
        ],
      });

      navigationStateProvider = TestBed.get(NavigationStateProvider);
      navController = TestBed.get(NavController);
    });

    it('should return true if this is the rekey search page', () => {
      spyOn(navController, 'getActive').and.returnValue({ id: REKEY_SEARCH_PAGE });

      const isRekeySearch = navigationStateProvider.isRekeySearch();
      expect(isRekeySearch).toBe(true);
    });

    it('should return false if this is not the rekey search page', () => {
      spyOn(navController, 'getActive').and.returnValue({ id: JOURNAL_PAGE });

      const isRekeySearch = navigationStateProvider.isRekeySearch();
      expect(isRekeySearch).toBe(false);
    });

  });
});
