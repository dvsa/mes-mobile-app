import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import * as rekeyReasonActions from '../rekey-reason.actions';
import { RekeyReasonAnalyticsEffects } from '../rekey-reason.analytics.effects';
import { Store, StoreModule } from '@ngrx/store';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as candidateActions from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
describe('Rekey Reason Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var screenName = AnalyticsScreenNames.REKEY_REASON;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                RekeyReasonAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(RekeyReasonAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('rekeyReasonViewDidEnter', function () {
        it('should call setCurrentPage', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new candidateActions.PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new rekeyReasonActions.RekeyReasonViewDidEnter());
            // ASSERT
            effects.rekeyReasonViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
                done();
            });
        });
    });
});
//# sourceMappingURL=rekey-reason.analytics.effects.spec.js.map