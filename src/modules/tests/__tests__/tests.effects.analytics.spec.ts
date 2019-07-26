import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsDimensionIndices,
  AnalyticsEventCategories,
  AnalyticsEvents,
} from '../../../providers/analytics/analytics.model';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../tests.reducer';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { TestsAnalyticsEffects } from '../tests.analytics.effects';
import * as testsActions from '../tests.actions';
import * as testStatusActions from '../test-status/test-status.actions';
import * as journalActions from '../../../pages/journal/journal.actions';
import * as candidateActions from '../candidate/candidate.actions';
import * as testSlotAttributesActions from '../test-slot-attributes/test-slot-attributes.actions';
import * as rekeyActions from '../rekey/rekey.actions';

import { Candidate, TestSlotAttributes } from '@dvsa/mes-test-schema/categories/B';
import { ActivityCodes } from '../../../shared/models/activity-codes';

describe('Tests Analytics Effects', () => {

  let effects: TestsAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const mockCandidate: Candidate = {
    candidateId: 1001,
  };
  const mockTestSlotAttributes: TestSlotAttributes = {
    slotId: 12345,
    start: '',
    vehicleTypeCode: '',
    welshTest: false,
    extendedTest: false,
    specialNeeds: false,
  };

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        TestsAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(TestsAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
    spyOn(analyticsProviderMock, 'addCustomDimension').and.callThrough();
    spyOn(analyticsProviderMock, 'logEvent').and.callThrough();
    spyOn(analyticsProviderMock, 'logError').and.callThrough();
  });

  describe('setTestStatusSubmittedEffect', () => {
    it('should set an action saying the test has been submitted if it is not a rekey', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(12345));
      store$.dispatch(new candidateActions.PopulateCandidateDetails(mockCandidate));
      store$.dispatch(new testsActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new testSlotAttributesActions.PopulateTestSlotAttributes(mockTestSlotAttributes));
      // ACT
      actions$.next(new testStatusActions.SetTestStatusSubmitted('12345'));
      // ASSERT
      effects.setTestStatusSubmittedEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.SUBMIT_TEST,
            'pass',
          );
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, '12345');
        done();
      });
    });
    it('should set an action saying the test has been submitted if it is a rekey', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(12345));
      store$.dispatch(new candidateActions.PopulateCandidateDetails(mockCandidate));
      store$.dispatch(new testsActions.SetActivityCode(ActivityCodes.FAIL));
      store$.dispatch(new testSlotAttributesActions.PopulateTestSlotAttributes(mockTestSlotAttributes));
      store$.dispatch(new candidateActions.PopulateCandidateDetails(mockCandidate));
      store$.dispatch(new rekeyActions.MarkAsRekey());
      // ACT
      actions$.next(new testStatusActions.SetTestStatusSubmitted('12345'));
      // ASSERT
      effects.setTestStatusSubmittedEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.SUBMIT_REKEY_TEST,
            'fail',
          );
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, '12345');
        done();
      });
    });
  });

  describe('sendCompletedTestsFailureEffect', () => {
    it('should send an error action', (done) => {
      // ACT
      actions$.next(new testsActions.SendCompletedTestsFailure());
      // ASSERT
      effects.sendCompletedTestsFailureEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(
            'Error connecting to microservice (test submission)',
            'No message',
          );
        done();
      });
    });
  });

  describe('testOutcomeChangedEffect', () => {
    it('should log an event', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(12345));
      store$.dispatch(new candidateActions.PopulateCandidateDetails(mockCandidate));
      store$.dispatch(new testSlotAttributesActions.PopulateTestSlotAttributes(mockTestSlotAttributes));
      const eventLabel = 'fail to pass';
      // ACT
      actions$.next(new testsActions.TestOutcomeChanged(eventLabel));
      // ASSERT
      effects.testOutcomeChangedEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.TEST_REPORT,
            AnalyticsEvents.TEST_OUTCOME_CHANGED,
            eventLabel,
          );
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, '12345');
        done();
      });
    });
  });
});
