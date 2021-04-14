import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { TestResultsSearchCardComponent } from '../test-results-search-card';
import { NavControllerMock } from 'ionic-mocks';
import { TEST_RESULTS_SEARCH_PAGE } from '../../../../page-names.constants';
import { configureTestSuite } from 'ng-bullet';
describe('TestResultsSearchCard ', function () {
    var component;
    var fixture;
    var navContoller;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [TestResultsSearchCardComponent],
            imports: [IonicModule.forRoot(TestResultsSearchCardComponent)],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TestResultsSearchCardComponent);
        component = fixture.componentInstance;
        navContoller = TestBed.get(NavController);
    }));
    describe('Class', function () {
        describe('navigateToFakeJournal', function () {
            it('should trigger navigation to Fake Journal', function () {
                component.navigateToTestResultsSearch();
                expect(navContoller.push).toHaveBeenCalledWith(TEST_RESULTS_SEARCH_PAGE);
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=test-results-search-card.spec.js.map