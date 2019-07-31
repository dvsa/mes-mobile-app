import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsEventCategories } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { StoreModel } from '../../../shared/models/store.model';
import * as journalActions from '../../journal/journal.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/candidate/candidate.actions';
import { Candidate } from '@dvsa/mes-journal-schema';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { PostDebriefHoldingAnalyticsEffects } from '../post-debrief-holding.analytics.effects';
import * as postDebriefHoldingActions from '../post-debrief-holding.actions';

describe('Post Debrief Holding Analytics Effects', () => {

  let effects: PostDebriefHoldingAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.POST_DEBRIEF_HOLDING;
  const practiceScreenName = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.POST_DEBRIEF_HOLDING}`;
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
        PostDebriefHoldingAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(PostDebriefHoldingAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
  });

  describe('backToOfficeViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new postDebriefHoldingActions.PostDebriefHoldingViewDidEnter());
      // ASSERT
      effects.postDebriefHoldingViewDidEnterEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
    it('should call setCurrentPage with practice mode prefix', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new postDebriefHoldingActions.PostDebriefHoldingViewDidEnter());
      // ASSERT
      effects.postDebriefHoldingViewDidEnterEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(practiceScreenName);
        done();
      });
    });
  });

});
