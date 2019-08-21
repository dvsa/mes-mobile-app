import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
} from '../../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../../providers/analytics/analytics.actions';
import * as rekeyReasonActions from '../rekey-reason.actions';
import { RekeyReasonAnalyticsEffects } from '../../../../pages/rekey-reason/rekey-reason.analytics.effects';
import { Store, StoreModule } from '@ngrx/store';
import { testsReducer } from '../../../../modules/tests/tests.reducer';
import { StoreModel } from '../../../../shared/models/store.model';
import * as testsActions from '../../../../modules/tests/tests.actions';
import * as candidateActions from '../../../../modules/tests/candidate/candidate.actions';
import { Candidate } from '../../../../shared/models/DJournal';

describe('Rekey Reason Analytics Effects', () => {

  let effects: RekeyReasonAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  const screenName = AnalyticsScreenNames.REKEY_REASON;
  let store$: Store<StoreModel>;
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
        RekeyReasonAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(RekeyReasonAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
  });

  describe('rekeyReasonViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123));
      store$.dispatch(new candidateActions.PopulateCandidateDetails(mockCandidate));
      // ACT
      actions$.next(new rekeyReasonActions.RekeyReasonViewDidEnter());
      // ASSERT
      effects.rekeyReasonViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
        done();
      });
    });
  });
});
