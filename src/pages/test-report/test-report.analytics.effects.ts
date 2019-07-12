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
import {
  TEST_REPORT_VIEW_DID_ENTER,
  TestReportViewDidEnter,
} from '../../pages/test-report/test-report.actions';
import * as  testDataActions from '../../modules/tests/test-data/test-data.actions';
import { getTests } from '../../modules/tests/tests.reducer';
import { isTestReportPracticeTest } from '../../modules/tests/tests.selector';
import { fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';
import {
  manoeuvreCompetencyLabels,
  manoeuvreTypeLabels,
} from './components/manoeuvre-competency/manoeuvre-competency.constants';

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
    ofType(TEST_REPORT_VIEW_DID_ENTER),
    switchMap((action: TestReportViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.TEST);
      return of({});
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
      }
      return of({});
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
      }
      return of({});
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
      }
      return of({});
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
      }
      return of({});
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
        );
      }
      return of({});
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
      }
      return of({});
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
      }
      return of({});
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
      }
      return of({});
    }),
  );

}
