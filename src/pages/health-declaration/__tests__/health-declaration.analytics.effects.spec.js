import { HealthDeclarationAnalyticsEffects } from '../health-declaration.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as healthDeclarationActions from '../health-declaration.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsErrorTypes, } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
describe('Health Declaration Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.HEALTH_DECLARATION;
    // tslint:disable-next-line:max-line-length
    var screenNamePracticeMode = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.HEALTH_DECLARATION;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                HealthDeclarationAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(HealthDeclarationAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('healthDeclarationViewDidEnter', function () {
        it('should call setCurrentPage', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new healthDeclarationActions.HealthDeclarationViewDidEnter());
            // ASSERT
            effects.healthDeclarationViewDidEnter$.subscribe(function (result) {
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
            actions$.next(new healthDeclarationActions.HealthDeclarationViewDidEnter());
            // ASSERT
            effects.healthDeclarationViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenNamePracticeMode);
                done();
            });
        });
    });
    describe('validationErrorEffect', function () {
        it('should call logError', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            // ACT
            actions$.next(new healthDeclarationActions.HealthDeclarationValidationError('error message'));
            // ASSERT
            effects.validationErrorEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + AnalyticsScreenNames.HEALTH_DECLARATION + ")", 'error message');
                done();
            });
        });
        it('should call logError with pass, prefixed with practice mode', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            var practiceScreenName = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.HEALTH_DECLARATION;
            // ACT
            actions$.next(new healthDeclarationActions.HealthDeclarationValidationError('error message'));
            // ASSERT
            effects.validationErrorEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + practiceScreenName + ")", 'error message');
                done();
            });
        });
    });
});
//# sourceMappingURL=health-declaration.analytics.effects.spec.js.map