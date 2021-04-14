import { TestBed } from '@angular/core/testing';
import { VehicleChecksModalCatAMod2AnalyticsEffects } from '../vehicle-checks-modal.cat-a-mod2.analytics.effects';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { AnalyticsProvider } from '../../../../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../../../../providers/analytics/__mocks__/analytics.mock';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testsActions from '../../../../../../modules/tests/tests.actions';
import { VehicleChecksViewDidEnter } from '../vehicle-checks-modal.cat-a-mod2.actions';
import { AnalyticRecorded } from '../../../../../../providers/analytics/analytics.actions';
import { AnalyticsEventCategories, AnalyticsScreenNames } from '../../../../../../providers/analytics/analytics.model';
import * as SafetyAndBalanceQuestionsActions from '../../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.actions';
describe('Vehicle Checks Modal A Mod2 Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.VEHICLE_CHECKS;
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                VehicleChecksModalCatAMod2AnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
        effects = TestBed.get(VehicleChecksModalCatAMod2AnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('vehicleChecksModalViewDidEnter$ effect', function () {
        it('should call analytics.setCurrentPage', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "EUAM2" /* EUAM2 */));
            actions$.next(new VehicleChecksViewDidEnter());
            effects.vehicleChecksModalViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
                done();
            });
        });
    });
    describe('safetyQuestionChanged$ effect', function () {
        var questionNumber = 1;
        var safetyQuestion = {
            code: 'S01',
        };
        it('should log an analyics event with safety question info', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "EUAM2" /* EUAM2 */));
            actions$.next(new SafetyAndBalanceQuestionsActions.SafetyQuestionSelected(safetyQuestion, questionNumber));
            effects.safetyQuestionChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.VEHICLE_CHECKS, "safety question " + (questionNumber + 1) + " changed", safetyQuestion.code);
                done();
            });
        });
    });
    describe('safetyQuestionOutComeChanged$', function () {
        var questionOutcome = 'P';
        var questionNumber = 1;
        it('should log an analytics event with safety question outcome info', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "EUAM2" /* EUAM2 */));
            actions$.next(new SafetyAndBalanceQuestionsActions.SafetyQuestionOutcomeChanged(questionOutcome, questionNumber));
            effects.safetyQuestionOutcomeChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.VEHICLE_CHECKS, "safety question " + (questionNumber + 1) + " outcome changed", 'correct');
                done();
            });
        });
    });
    describe('balanceQuestionChanged$ effect', function () {
        var questionNumber = 1;
        var balanceQuestion = {
            code: 'T01',
        };
        it('should log an analyics event with balance question info', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "EUAM2" /* EUAM2 */));
            actions$.next(new SafetyAndBalanceQuestionsActions.BalanceQuestionSelected(balanceQuestion, questionNumber));
            effects.balanceQuestionChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.VEHICLE_CHECKS, "balance question " + (questionNumber + 1) + " changed", balanceQuestion.code);
                done();
            });
        });
    });
    describe('balanceQuestionOutComeChanged$', function () {
        var questionOutcome = 'DF';
        var questionNumber = 1;
        it('should log an analytics event with balance question outcome info', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "EUAM2" /* EUAM2 */));
            actions$.next(new SafetyAndBalanceQuestionsActions.BalanceQuestionOutcomeChanged(questionOutcome, questionNumber));
            effects.balanceQuestionOutcomeChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.VEHICLE_CHECKS, "balance question " + (questionNumber + 1) + " outcome changed", 'driving fault');
                done();
            });
        });
    });
});
//# sourceMappingURL=vehicle-checks-modal.cat-a-mod2.analytics.effects.spec.js.map