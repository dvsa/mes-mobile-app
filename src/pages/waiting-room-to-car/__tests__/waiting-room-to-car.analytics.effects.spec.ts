import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsErrorTypes,
  AnalyticsEventCategories,
} from '../../../providers/analytics/analytics.model';
import { StoreModel } from '../../../shared/models/store.model';
import { Candidate, Application } from '@dvsa/mes-journal-schema';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { PopulateCandidateDetails } from '../../../modules/tests/candidate/candidate.actions';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import * as applicationReferenceActions
  from '../../../modules/tests/application-reference/application-reference.actions';

describe('Waiting Room To Car Analytics Effects', () => {

  let effects: WaitingRoomToCarAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.WAITING_ROOM_TO_CAR;
  // tslint:disable-next-line:max-line-length
  const screenNamePracticeMode = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.WAITING_ROOM_TO_CAR}`;
  const mockCandidate: Candidate = {
    candidateId: 1001,
  };
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
        WaitingRoomToCarAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(WaitingRoomToCarAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

  describe('waitingRoomToCarViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
      // ASSERT
      effects.waitingRoomToCarViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
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
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
      // ASSERT
      effects.waitingRoomToCarViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeMode);
        done();
      });
    });

  });

  describe('waitingRoomToCarError', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarError('error 123'));
      // ASSERT
      effects.waitingRoomToCarError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
        // tslint:disable-next-line:max-line-length
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${screenName})`,
          'error 123');
        done();
      });
    });
    it('should call logError, prefixed with practice mode', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarError('error 123'));
      // ASSERT
      effects.waitingRoomToCarError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.SUBMIT_FORM_ERROR} (${screenNamePracticeMode})`,
          'error 123');
        done();
      });
    });

  });

  describe('waitingRoomToCarValidationError', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarValidationError('formControl1'));
      // ASSERT
      effects.waitingRoomToCarValidationError$.subscribe((result) => {
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
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new waitingRoomToCarActions.WaitingRoomToCarValidationError('formControl1'));
      // ASSERT
      effects.waitingRoomToCarValidationError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenNamePracticeMode})`,
          'formControl1');
        done();
      });
    });

  });

});
