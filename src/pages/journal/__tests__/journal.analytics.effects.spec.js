import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, AnalyticsDimensionIndices, JournalRefreshModes, } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { JournalAnalyticsEffects } from '../journal.analytics.effects';
import * as journalActions from '../../../modules/journal/journal.actions';
import { Store, StoreModule } from '@ngrx/store';
import { journalReducer } from '../../../modules/journal/journal.reducer';
import * as slotActions from '../../../providers/slot/slot.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Journal Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var screenName = AnalyticsScreenNames.JOURNAL;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    journal: journalReducer,
                }),
            ],
            providers: [
                JournalAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(JournalAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
    });
    describe('journalView', function () {
        it('should call setCurrentPage', function (done) {
            // ACT
            actions$.next(new journalActions.JournalViewDidEnter());
            // ASSERT
            effects.journalView$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenName);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '');
                done();
            });
        });
    });
    describe('journalNavigation', function () {
        it('should log an event', function (done) {
            // ACT
            actions$.next(new journalActions.JournalNavigateDay('1'));
            // ASSERT
            effects.journalNavigation$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.NAVIGATION, 'Tomorrow');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.JOURNAL_DAYS_FROM_TODAY, '4');
                done();
            });
        });
    });
    describe('journalRefresh', function () {
        it('should log an event', function (done) {
            // ACT
            actions$.next(new journalActions.JournalRefresh(JournalRefreshModes.AUTOMATIC));
            // ASSERT
            effects.journalRefresh$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.REFRESH_JOURNAL, JournalRefreshModes.AUTOMATIC);
                done();
            });
        });
    });
    describe('earlyStartModalDidEnter', function () {
        it('should log an event', function (done) {
            actions$.next(new journalActions.EarlyStartModalDidEnter());
            effects.earlyStartModalDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.DISPLAY_EARLY_START_MODAL);
                done();
            });
        });
    });
    describe('earlyStartModalContinue', function () {
        it('should log an event', function (done) {
            actions$.next(new journalActions.EarlyStartDidContinue());
            effects.earlyStartModalContinue$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.EXIT_EARLY_START_MODAL_CONTINUE);
                done();
            });
        });
    });
    describe('earlyStartModalReturn', function () {
        it('should log an event', function (done) {
            actions$.next(new journalActions.EarlyStartDidReturn());
            effects.earlyStartModalReturn$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.EXIT_EARLY_START_MODAL_RETURN);
                done();
            });
        });
    });
    describe('journalRefreshError', function () {
        it('should log an error', function (done) {
            // ACT
            actions$.next(new journalActions.JournalRefreshError('error-description', 'error-message'));
            // ASSERT
            effects.journalRefreshError$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith('error-description', 'error-message');
                done();
            });
        });
    });
    describe('slotChanged', function () {
        it('should log an event', function (done) {
            // ACT
            actions$.next(new slotActions.SlotHasChanged(12345));
            // ASSERT
            effects.slotChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.SLOT_CHANGED, '12345');
                done();
            });
        });
    });
});
//# sourceMappingURL=journal.analytics.effects.spec.js.map