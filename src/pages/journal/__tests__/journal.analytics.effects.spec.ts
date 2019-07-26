import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsDimensionIndices,
  JournalRefreshModes,
} from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { JournalAnalyticsEffects } from '../journal.analytics.effects';
import * as journalActions from '../journal.actions';
import { Store, StoreModule } from '@ngrx/store';
import { journalReducer } from '../journal.reducer';
import * as slotActions from '../../../providers/slot/slot.actions';

describe('Journal Analytics Effects', () => {

  let effects: JournalAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  const screenName = AnalyticsScreenNames.JOURNAL;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          journal: journalReducer,
        }),
      ],
      providers: [
        JournalAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(JournalAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
    spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
    spyOn(analyticsProviderMock, 'addCustomDimension').and.callThrough();
    spyOn(analyticsProviderMock, 'logError').and.callThrough();
  });

  describe('journalView', () => {
    it('should call setCurrentPage', (done) => {
      // ACT
      actions$.next(new journalActions.JournalViewDidEnter());
      // ASSERT
      effects.journalView$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, '');
        done();
      });
    });
  });
  describe('journalNavigation', () => {
    it('should log an event', (done) => {
      // ACT
      actions$.next(new journalActions.JournalNavigateDay('1'));
      // ASSERT
      effects.journalNavigation$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.JOURNAL,
            AnalyticsEvents.NAVIGATION,
            'Tomorrow',
          );
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.JOURNAL_DAYS_FROM_TODAY,
            '4',
          );

        done();
      });
    });
  });
  describe('journalRefresh', () => {
    it('should log an event', (done) => {
      // ACT
      actions$.next(new journalActions.JournalRefresh(JournalRefreshModes.AUTOMATIC));
      // ASSERT
      effects.journalRefresh$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
        .toHaveBeenCalledWith(
          AnalyticsEventCategories.JOURNAL,
          AnalyticsEvents.REFRESH_JOURNAL,
          JournalRefreshModes.AUTOMATIC,
        );
        done();
      });
    });
  });
  describe('journalRefreshError', () => {
    it('should log an error', (done) => {
      // ACT
      actions$.next(new journalActions.JournalRefreshError('error-description', 'error-message'));
      // ASSERT
      effects.journalRefreshError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
        .toHaveBeenCalledWith(
          'error-description',
          'error-message',
        );
        done();
      });
    });
  });

  describe('slotChanged', () => {
    it('should log an event', (done) => {
      // ACT
      actions$.next(new slotActions.SlotHasChanged(12345));
      // ASSERT
      effects.slotChanged$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
        .toHaveBeenCalledWith(
          AnalyticsEventCategories.JOURNAL,
          AnalyticsEvents.SLOT_CHANGED,
          '12345',
        );
        done();
      });
    });
  });

  describe('testOutcomeStartTest', () => {
    it('should log an Start Test event if isRekey is false', (done) => {
      // ACT
      actions$.next(new journalActions.StartTest(12345, false));
      // ASSERT
      effects.testOutcomeStartTest$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
        .toHaveBeenCalledWith(
          AnalyticsEventCategories.JOURNAL,
          AnalyticsEvents.START_TEST,
          '12345',
        );
        done();
      });
      it('should log an Rekey Test event if isRekey is true', (done) => {
        // ACT
        actions$.next(new journalActions.StartTest(12345, true));
        // ASSERT
        effects.testOutcomeStartTest$.subscribe((result) => {
          expect(result instanceof AnalyticRecorded).toBe(true);
          expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.JOURNAL,
            AnalyticsEvents.REKEY_TEST,
            '12345',
          );
          done();
        });
      });
    });
  });
});
