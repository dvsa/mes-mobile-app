import { TestBed } from '@angular/core/testing';
import { VehicleChecksModalAnalyticsEffects } from '../vehicle-checks-modal.cat-home-test.analytics.effects';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { AnalyticsProvider } from '../../../../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../../../../providers/analytics/__mocks__/analytics.mock';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testsActions from '../../../../../../modules/tests/tests.actions';
import { VehicleChecksViewDidEnter } from '../vehicle-checks-modal.cat-home-test.actions';
import { AnalyticRecorded } from '../../../../../../providers/analytics/analytics.actions';
import { AnalyticsEventCategories, AnalyticsScreenNames } from '../../../../../../providers/analytics/analytics.model';
import * as VehicleChecksActions from '../../../../../../modules/tests/test-data/cat-home-test/vehicle-checks/vehicle-checks.cat-home-test.action';
import { configureTestSuite } from 'ng-bullet';
describe('Vehicle Checks Modal Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.VEHICLE_CHECKS;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                VehicleChecksModalAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(VehicleChecksModalAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('vehicleChecksModalViewDidEnter$ effect', function () {
        it('should call analytics.setCurrentPage', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "F" /* F */));
            actions$.next(new VehicleChecksViewDidEnter());
            effects.vehicleChecksModalViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
                done();
            });
        });
    });
    describe('showMeQuestionChanged$ effect', function () {
        var questionNumber = 1;
        var showMeQuestion = {
            code: 'S01',
        };
        it('should log an analyics event with show me question info', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "F" /* F */));
            actions$.next(new VehicleChecksActions.ShowMeQuestionSelected(showMeQuestion, questionNumber));
            effects.showMeQuestionChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.VEHICLE_CHECKS, "show me question " + (questionNumber + 1) + " changed", showMeQuestion.code);
                done();
            });
        });
    });
    describe('showMeQuestionOutComeChanged$', function () {
        var questionOutcome = 'P';
        var questionNumber = 1;
        it('should log an analytics event with show me question outcome info', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "F" /* F */));
            actions$.next(new VehicleChecksActions.ShowMeQuestionOutcomeChanged(questionOutcome, questionNumber));
            effects.showMeQuestionOutComeChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.VEHICLE_CHECKS, "show me question " + (questionNumber + 1) + " outcome changed", 'correct');
                done();
            });
        });
    });
    describe('tellMeQuestionChanged$ effect', function () {
        var questionNumber = 1;
        var tellMeQuestion = {
            code: 'T01',
        };
        it('should log an analyics event with tell me question info', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "F" /* F */));
            actions$.next(new VehicleChecksActions.TellMeQuestionSelected(tellMeQuestion, questionNumber));
            effects.tellMeQuestionChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.VEHICLE_CHECKS, "tell me question " + (questionNumber + 1) + " changed", tellMeQuestion.code);
                done();
            });
        });
    });
    describe('tellMeQuestionOutComeChanged$', function () {
        var questionOutcome = 'DF';
        var questionNumber = 1;
        it('should log an analytics event with tell me question outcome info', function (done) {
            store$.dispatch(new testsActions.StartTest(12345, "F" /* F */));
            actions$.next(new VehicleChecksActions.TellMeQuestionOutcomeChanged(questionOutcome, questionNumber));
            effects.tellMeQuestionOutComeChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.VEHICLE_CHECKS, "tell me question " + (questionNumber + 1) + " outcome changed", 'driving fault');
                done();
            });
        });
    });
});
//# sourceMappingURL=vehicle-checks-modal.cat-home-test.analytics.effects.spec.js.map