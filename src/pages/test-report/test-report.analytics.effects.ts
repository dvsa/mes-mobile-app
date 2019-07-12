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
import { getTests } from '../../modules/tests/tests.reducer';
import { isTestReportPracticeTest } from '../../modules/tests/tests.selector';
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testReportActions.ToggleRemoveFaultMode, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testReportActions.ToggleSeriousFaultMode, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testReportActions.ToggleDangerousFaultMode, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.AddDrivingFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.AddSeriousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.AddDangerousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.AddManoeuvreDrivingFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.AddManoeuvreSeriousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.AddManoeuvreDangerousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.ControlledStopAddDrivingFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.ControlledStopAddSeriousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.ControlledStopAddDangerousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.ShowMeQuestionDrivingFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.ShowMeQuestionSeriousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.ShowMeQuestionDangerousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.RemoveDrivingFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.RemoveSeriousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.RemoveDangerousFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.RemoveManoeuvreFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.ControlledStopRemoveFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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
        map(isTestReportPracticeTest),
      ),
    ),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.ShowMeQuestionRemoveFault, boolean]) => {
      if (!isTestReportPracticeTest) {
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

}
