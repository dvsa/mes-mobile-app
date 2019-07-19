import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as communicationActions from '../communication.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsErrorTypes,
} from '../../../providers/analytics/analytics.model';
import { StoreModel } from '../../../shared/models/store.model';
import { Candidate } from '@dvsa/mes-journal-schema';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import * as journalActions from '../../journal/journal.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { PopulateCandidateDetails } from '../../../modules/tests/candidate/candidate.actions';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';

describe('Communication Analytics Effects', () => {

  let effects: CommunicationAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.COMMUNICATION;
  const screenNamePracticeMode = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.COMMUNICATION}`;
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
        CommunicationAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(CommunicationAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
    spyOn(analyticsProviderMock, 'addCustomDimension').and.callThrough();
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
    spyOn(analyticsProviderMock, 'logError').and.callThrough();
  });

  describe('communicationViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new communicationActions.CommunicationViewDidEnter());
      // ASSERT
      effects.communicationViewDidEnter$.subscribe((result) => {
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
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new communicationActions.CommunicationViewDidEnter());
      // ASSERT
      effects.communicationViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1001');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_ID, end2endPracticeSlotId);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeMode);
        done();
      });
    });

  });

  describe('communicationValidationError', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new communicationActions.CommunicationValidationError('formControl1'));
      // ASSERT
      effects.communicationValidationError$.subscribe((result) => {
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
      actions$.next(new communicationActions.CommunicationValidationError('formControl1'));
      // ASSERT
      effects.communicationValidationError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenNamePracticeMode})`,
          'formControl1');
        done();
      });
    });

  });

});
