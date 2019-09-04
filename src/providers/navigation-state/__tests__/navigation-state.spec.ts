import { TestBed } from '@angular/core/testing';
import { NavigationStateProvider } from '../navigation-state';
import { App } from 'ionic-angular';
import { REKEY_SEARCH_PAGE, JOURNAL_PAGE } from '../../../pages/page-names.constants';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { NavigationHelper } from '../navigation-helper';
import { NavigationHelperMock } from '../__mocks__/navigation-helper.mock';

describe('NavigationStateProvider', () => {
  describe('isRekeySearch', () => {
    let navigationStateProvider: NavigationStateProvider;
    let navigation: NavigationHelper;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          NavigationStateProvider,
          { provide: App, useClass: MockAppComponent },
          { provide: NavigationHelper, useClass: NavigationHelperMock },
        ],
      });

      navigationStateProvider = TestBed.get(NavigationStateProvider);
      navigation = TestBed.get(NavigationHelper);
    });

    it('should return true if this is the rekey search page', () => {
      spyOn(navigation, 'getActive').and.returnValue({ id: REKEY_SEARCH_PAGE });

      const isRekeySearch = navigationStateProvider.isRekeySearch();
      expect(isRekeySearch).toBe(true);
    });

    it('should return false if this is not the rekey search page', () => {
      spyOn(navigation, 'getActive').and.returnValue({ id: JOURNAL_PAGE });

      const isRekeySearch = navigationStateProvider.isRekeySearch();
      expect(isRekeySearch).toBe(false);
    });

  });
});
