import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsEvents,
} from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { TestResultsSearchAnalyticsEffects } from '../test-results-search.analytics.effects';
import * as testResultSearchActions from '../test-results-search.actions';

describe('Test Results Search Analytics Effects', () => {

  let effects: TestResultsSearchAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  const screenName = AnalyticsScreenNames.TEST_RESULTS_SEARCH;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      providers: [
        TestResultsSearchAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(TestResultsSearchAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
    spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
  });

  describe('testResultSearchViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ACT
      actions$.next(new testResultSearchActions.TestResultSearchViewDidEnter());
      // ASSERT
      effects.testResultSearchViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
  });
  describe('performApplicationReferenceSearch', () => {
    it('should call logEvent', (done) => {
      // ACT
      actions$.next(new testResultSearchActions.PerformApplicationReferenceSearch());
      // ASSERT
      effects.performApplicationReferenceSearch$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.TEST_RESULTS_SEARCH,
            AnalyticsEvents.APPLICATION_REFERENCE_SEARCH,
          );
        done();
      });
    });
  });
  describe('performDriverNumberSearch', () => {
    it('should call logEvent', (done) => {
      // ACT
      actions$.next(new testResultSearchActions.PerformDriverNumberSearch());
      // ASSERT
      effects.performDriverNumberSearch$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.TEST_RESULTS_SEARCH,
            AnalyticsEvents.DRIVER_NUMBER_SEARCH,
          );
        done();
      });
    });
  });
  describe('performLDTMSearch', () => {
    it('should call logEvent', (done) => {
      // ACT
      actions$.next(new testResultSearchActions.PerformLDTMSearch());
      // ASSERT
      effects.performLDTMSearch$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.TEST_RESULTS_SEARCH,
            AnalyticsEvents.LDTM_SEARCH,
          );
        done();
      });
    });
  });
});
