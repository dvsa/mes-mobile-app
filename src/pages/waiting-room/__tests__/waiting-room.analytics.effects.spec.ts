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
import * as testsActions from '../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/candidate/candidate.actions';
import { Application } from '@dvsa/mes-journal-schema';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import * as applicationReferenceActions
  from '../../../modules/tests/journal-data/application-reference/application-reference.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';

describe('Waiting Room Analytics Effects', () => {

  let effects: WaitingRoomAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.WAITING_ROOM;
  const screenNamePracticeMode = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.WAITING_ROOM}`;
  const mockApplication: Application = {
    applicationId: 123456,
    bookingSequence: 78,
    checkDigit: 9,
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
  });

  describe('waitingRoomViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomViewDidEnter());
      // ASSERT
      effects.waitingRoomViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
    it('should call setCurrentPage with practice mode prefix and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomViewDidEnter());
      // ASSERT
      effects.waitingRoomViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeMode);
        done();
      });
    });

  });

  describe('submitWaitingRoomInfoError', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
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
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new waitingRoomActions.SubmitWaitingRoomInfoError('error 123'));
      // ASSERT
      effects.submitWaitingRoomInfoError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${screenNamePracticeMode})`,
          'error 123');
        done();
      });
    });

  });

  describe('submitWaitingRoomInfoErrorValidation', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
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
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new waitingRoomActions.WaitingRoomValidationError('formControl1'));
      // ASSERT
      effects.submitWaitingRoomInfoErrorValidation$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenNamePracticeMode})`,
          'formControl1');
        done();
      });
    });

  });

});
