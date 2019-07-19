import { DebriefAnalyticsEffects } from '../debrief.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as debriefActions from '../debrief.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
} from '../../../providers/analytics/analytics.model';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import * as journalActions from '../../journal/journal.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { ActivityCodes } from '../../../shared/models/activity-codes';

describe('Debrief Analytics Effects', () => {

  let effects: DebriefAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenNamePass = AnalyticsScreenNames.PASS_DEBRIEF;
  const screenNameFail = AnalyticsScreenNames.FAIL_DEBRIEF;
  const screenNamePracticeModePass = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.PASS_DEBRIEF}`;
  const screenNamePracticeModeFail = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.FAIL_DEBRIEF}`;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        DebriefAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(DebriefAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
    spyOn(analyticsProviderMock, 'setCurrentPage').and.callThrough();
  });

  describe('debriefViewDidEnter', () => {
    it('should call setCurrentPage with pass page', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123));
      store$.dispatch(new testsActions.SetActivityCode(ActivityCodes.PASS));
      // ACT
      actions$.next(new debriefActions.DebriefViewDidEnter());
      // ASSERT
      effects.debriefViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePass);
        done();
      });
    });
    it('should call setCurrentPage with fail page', (done) => {
      // ARRANGE
      store$.dispatch(new journalActions.StartTest(123));
      store$.dispatch(new testsActions.SetActivityCode(ActivityCodes.FAIL));
      // ACT
      actions$.next(new debriefActions.DebriefViewDidEnter());
      // ASSERT
      effects.debriefViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNameFail);
        done();
      });
    });
    it('should call setCurrentPage with pass and practice mode prefix', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new testsActions.SetActivityCode(ActivityCodes.PASS));
      // ACT
      actions$.next(new debriefActions.DebriefViewDidEnter());
      // ASSERT
      effects.debriefViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeModePass);
        done();
      });
    });
    it('should call setCurrentPage with fail and practice mode prefix', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new testsActions.SetActivityCode(ActivityCodes.FAIL));
      // ACT
      actions$.next(new debriefActions.DebriefViewDidEnter());
      // ASSERT
      effects.debriefViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeModeFail);
        done();
      });
    });

  });

});
