import { WaitingRoomAnalyticsEffects } from '../waiting-room.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as waitingRoomActions from '../waiting-room.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsErrorTypes,
  AnalyticsEventCategories,
} from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { StoreModel } from '../../../shared/models/store.model';
import * as journalActions from '../../journal/journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { testReportPracticeModeSlot } from '../../../modules/tests/__mocks__/tests.mock';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/candidate/candidate.actions';
import { Candidate } from '@dvsa/mes-journal-schema';

describe('Waiting Room Analytics Effects', () => {

  let effects: WaitingRoomAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.WAITING_ROOM;
  const screenNamePracticeTest = `${AnalyticsEventCategories.PRACTICE_TEST} - ${AnalyticsScreenNames.WAITING_ROOM}`;
  const mockCandidate: Candidate = {
    candidateId: 1001,
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
        WaitingRoomAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(WaitingRoomAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
    spyOn(analyticsProviderMock, 'addCustomDimension').and.callThrough();
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
    spyOn(analyticsProviderMock, 'logError').and.callThrough();
  });

  describe('waitingRoomViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomViewDidEnter());
      // ASSERT
      effects.waitingRoomViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, '123');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
    it('should call setCurrentPage with practice mode prefix and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomViewDidEnter());
      // ASSERT
      effects.waitingRoomViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, testReportPracticeModeSlot.slotDetail.slotId);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeTest);
        done();
      });
    });

  });

  describe('submitWaitingRoomInfoError', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomActions.SubmitWaitingRoomInfoError('error 123'));
      // ASSERT
      effects.submitWaitingRoomInfoError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${screenName})`,
          'error 123');
        done();
      });
    });
    it('should call logError, prefixed with practice mode', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomActions.SubmitWaitingRoomInfoError('error 123'));
      // ASSERT
      effects.submitWaitingRoomInfoError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${screenNamePracticeTest})`,
          'error 123');
        done();
      });
    });

  });

  describe('submitWaitingRoomInfoErrorValidation', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomValidationError('formControl1'));
      // ASSERT
      effects.submitWaitingRoomInfoErrorValidation$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`,
          'formControl1');
        done();
      });
    });
    it('should call logError, prefixed with practice mode', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomValidationError('formControl1'));
      // ASSERT
      effects.submitWaitingRoomInfoErrorValidation$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenNamePracticeTest})`,
          'formControl1');
        done();
      });
    });

  });

});
