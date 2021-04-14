import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsEventCategories } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { PostDebriefHoldingAnalyticsEffects } from '../post-debrief-holding.analytics.effects';
import * as postDebriefHoldingActions from '../post-debrief-holding.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
describe('Post Debrief Holding Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.POST_DEBRIEF_HOLDING;
    var practiceScreenName = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.POST_DEBRIEF_HOLDING;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                PostDebriefHoldingAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(PostDebriefHoldingAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('backToOfficeViewDidEnter', function () {
        it('should call setCurrentPage', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new postDebriefHoldingActions.PostDebriefHoldingViewDidEnter());
            // ASSERT
            effects.postDebriefHoldingViewDidEnterEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenName);
                done();
            });
        });
        it('should call setCurrentPage with practice mode prefix', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new postDebriefHoldingActions.PostDebriefHoldingViewDidEnter());
            // ASSERT
            effects.postDebriefHoldingViewDidEnterEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(practiceScreenName);
                done();
            });
        });
    });
});
//# sourceMappingURL=post-debrief-holding.analytics.spec.js.map