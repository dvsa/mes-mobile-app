import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { App } from 'ionic-angular';
import { NavigationStateProvider } from '../navigation-state';
import { REKEY_SEARCH_PAGE, JOURNAL_PAGE, DELEGATED_REKEY_SEARCH_PAGE } from '../../../pages/page-names.constants';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { NavigationProvider } from '../../navigation/navigation';
import { NavigationProviderMock } from '../../navigation/__mocks__/navigation.mock';
describe('NavigationStateProvider', function () {
    var navigationStateProvider;
    var navigation;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                NavigationStateProvider,
                { provide: App, useClass: MockAppComponent },
                { provide: NavigationProvider, useClass: NavigationProviderMock },
            ],
        });
    });
    beforeEach(function () {
        navigationStateProvider = TestBed.get(NavigationStateProvider);
        navigation = TestBed.get(NavigationProvider);
    });
    describe('isRekeySearch', function () {
        it('should return true if this is the rekey search page', function () {
            spyOn(navigation, 'getActive').and.returnValue({ id: REKEY_SEARCH_PAGE });
            var isRekeySearch = navigationStateProvider.isRekeySearch();
            expect(isRekeySearch).toBe(true);
        });
        it('should return false if this is not the rekey search page', function () {
            spyOn(navigation, 'getActive').and.returnValue({ id: JOURNAL_PAGE });
            var isRekeySearch = navigationStateProvider.isRekeySearch();
            expect(isRekeySearch).toBe(false);
        });
    });
    describe('isDelegatedExaminerRekeySearch', function () {
        it('should return true if this is the delegated rekey search page', function () {
            spyOn(navigation, 'getActive').and.returnValue({ id: DELEGATED_REKEY_SEARCH_PAGE });
            var isDelegatedRekeySearch = navigationStateProvider.isDelegatedExaminerRekeySearch();
            expect(isDelegatedRekeySearch).toBe(true);
        });
        it('should return false if this is not the delegated rekey search page', function () {
            spyOn(navigation, 'getActive').and.returnValue({ id: JOURNAL_PAGE });
            var isDelegatedRekeySearch = navigationStateProvider.isDelegatedExaminerRekeySearch();
            expect(isDelegatedRekeySearch).toBe(false);
        });
    });
});
//# sourceMappingURL=navigation-state.spec.js.map