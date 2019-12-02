import { TestBed } from '@angular/core/testing';
import { NavigationStateProvider } from '../navigation-state';
import { App } from 'ionic-angular';
import { REKEY_SEARCH_PAGE, JOURNAL_PAGE } from '../../../pages/page-names.constants';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { NavigationProvider } from '../../navigation/navigation';
import { NavigationProviderMock } from '../../navigation/__mocks__/navigation.mock';
import { configureTestSuite } from 'ng-bullet';

describe('NavigationStateProvider', () => {
  describe('isRekeySearch', () => {
    let navigationStateProvider: NavigationStateProvider;
    let navigation: NavigationProvider;

    configureTestSuite(() => {
      TestBed.configureTestingModule({
        providers: [
          NavigationStateProvider,
          { provide: App, useClass: MockAppComponent },
          { provide: NavigationProvider, useClass: NavigationProviderMock },
        ],
      });
    });

    beforeEach(() => {
      navigationStateProvider = TestBed.get(NavigationStateProvider);
      navigation = TestBed.get(NavigationProvider);
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
