import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, concatMap, withLatestFrom, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents,
} from '../../providers/analytics/analytics.model';
import * as testReportActions from '../../pages/test-report/test-report.actions';
import * as testDataActions from '../../modules/tests/test-data/test-data.actions';
import {
  TerminateTestFromTestReport,
  TERMINATE_TEST_FROM_TEST_REPORT,
} from '../../pages/test-report/test-report.actions';
import { getTests } from '../../modules/tests/tests.reducer';
import { isPracticeMode } from '../../modules/tests/tests.selector';
import { fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';
import {
  manoeuvreCompetencyLabels,
  manoeuvreTypeLabels,
} from './components/manoeuvre-competency/manoeuvre-competency.constants';
import { AnalyticRecorded, AnalyticNotRecorded } from '../../providers/analytics/analytics.actions';

@Injectable()
export class TestReportAnalyticsEffects {

  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => {})
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  testReportViewDidEnter$ = this.actions$.pipe(
    ofType(testReportActions.TEST_REPORT_VIEW_DID_ENTER),
    switchMap((action: testReportActions.TestReportViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.TEST);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  toggleRemoveFaultMode$ = this.actions$.pipe(
    ofType(testReportActions.TOGGLE_REMOVE_FAULT_MODE),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testReportActions.ToggleRemoveFaultMode, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.SELECT_REMOVE_MODE,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  toggleSeriousFaultMode$ = this.actions$.pipe(
    ofType(testReportActions.TOGGLE_SERIOUS_FAULT_MODE),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testReportActions.ToggleSeriousFaultMode, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.SELECT_SERIOUS_MODE,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  toggleDangerousFaultMode$ = this.actions$.pipe(
    ofType(testReportActions.TOGGLE_DANGEROUS_FAULT_MODE),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testReportActions.ToggleDangerousFaultMode, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.SELECT_DANGEROUS_MODE,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  addDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_DRIVING_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.AddDrivingFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          fullCompetencyLabels[action.payload.competency],
          action.payload.newFaultCount,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  addSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_SERIOUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.AddSeriousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          fullCompetencyLabels[action.payload],
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  addDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_DANGEROUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.AddDangerousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          fullCompetencyLabels[action.payload],
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  addManoeuvreDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_MANOEUVRE_DRIVING_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.AddManoeuvreDrivingFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  addManoeuvreSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_MANOEUVRE_SERIOUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.AddManoeuvreSeriousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  addManoeuvreDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_MANOEUVRE_DANGEROUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.AddManoeuvreDangerousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  controlledStopAddDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.CONTROLLED_STOP_ADD_DRIVING_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.ControlledStopAddDrivingFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  controlledStopAddSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.ControlledStopAddSeriousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  controlledStopAddDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.ControlledStopAddDangerousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          fullCompetencyLabels['outcomeControlledStop'],
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  showMeQuestionDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_DRIVING_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.ShowMeQuestionDrivingFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DRIVING_FAULT,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  showMeQuestionSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.ShowMeQuestionSeriousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_SERIOUS_FAULT,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  showMeQuestionDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.ShowMeQuestionDangerousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.ADD_DANGEROUS_FAULT,
          fullCompetencyLabels['showMeQuestion'],
          1,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  removeDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_DRIVING_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.RemoveDrivingFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_DRIVING_FAULT,
          fullCompetencyLabels[action.payload.competency],
          action.payload.newFaultCount,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  removeSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_SERIOUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.RemoveSeriousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_SERIOUS_FAULT,
          fullCompetencyLabels[action.payload],
          0,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  removeDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_DANGEROUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.RemoveDangerousFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_DANGEROUS_FAULT,
          fullCompetencyLabels[action.payload],
          0,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  removeManoeuvreFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_MANOEUVRE_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.RemoveManoeuvreFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_DRIVING_FAULT,
          `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  controlledStopRemoveFault$ = this.actions$.pipe(
    ofType(
      testDataActions.CONTROLLED_STOP_REMOVE_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.ControlledStopRemoveFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_FAULT,
          fullCompetencyLabels['outcomeControlledStop'],
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  @Effect()
  showMeQuestionRemoveFault$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_REMOVE_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isPracticeMode),
      ),
    ),
    concatMap(([action, isPracticeMode]: [testDataActions.ShowMeQuestionRemoveFault, boolean]) => {
      if (!isPracticeMode) {
        this.analytics.logEvent(
          AnalyticsEventCategories.TEST_REPORT,
          AnalyticsEvents.REMOVE_FAULT,
          fullCompetencyLabels['showMeQuestion'],
        );
        return of(new AnalyticRecorded());
      }
      return of(new AnalyticNotRecorded());
    }),
  );

  testTermination$ = this.actions$.pipe(
    ofType(TERMINATE_TEST_FROM_TEST_REPORT),
    switchMap((action: TerminateTestFromTestReport) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TERMINATION,
        AnalyticsEvents.END_TEST,
        'Test report - legal requirements not met',
      );
      return of();
    }),
  );
}
