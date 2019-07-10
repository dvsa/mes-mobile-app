import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, concatMap, withLatestFrom, map, filter } from 'rxjs/operators';
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
    public analytics: AnalyticsProvider,
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
      return of();
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
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.AddDrivingFault, boolean]) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_REPORT,
        AnalyticsEvents.ADD_DRIVING_FAULT,
        fullCompetencyLabels[action.payload.competency],
      );
      return of();
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
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.AddManoeuvreDrivingFault, boolean]) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_REPORT,
        AnalyticsEvents.ADD_DRIVING_FAULT,
        `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
      );
      return of();
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
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    concatMap(() => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_REPORT,
        AnalyticsEvents.ADD_DRIVING_FAULT,
        fullCompetencyLabels['outcomeControlledStop'],
      );
      return of();
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
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    concatMap(() => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_REPORT,
        AnalyticsEvents.ADD_DRIVING_FAULT,
        'Show me question', // TODO remove magic string
      );
      return of();
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
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.RemoveDrivingFault, boolean]) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_REPORT,
        AnalyticsEvents.REMOVE_DRIVING_FAULT,
        fullCompetencyLabels[action.payload.competency],
      );
      return of();
    }),
  );

  @Effect()
  removeManoeuvreDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_MANOEUVRE_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(isTestReportPracticeTest),
      ),
    ),
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    concatMap(([action, isTestReportPracticeTest]: [testDataActions.RemoveManoeuvreFault, boolean]) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_REPORT,
        AnalyticsEvents.REMOVE_DRIVING_FAULT,
        `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
      );
      return of();
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
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    concatMap(() => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_REPORT,
        AnalyticsEvents.REMOVE_FAULT,
        fullCompetencyLabels['outcomeControlledStop'],
      );
      return of();
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
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    concatMap(() => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_REPORT,
        AnalyticsEvents.REMOVE_FAULT,
        'Show me question', // TODO remove magic string
      );
      return of();
    }),
  );

}
