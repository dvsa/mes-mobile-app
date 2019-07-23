import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, AnalyticsLabels,
} from '../../providers/analytics/analytics.model';
import * as testReportActions from '../../pages/test-report/test-report.actions';
import * as testDataActions from '../../modules/tests/test-data/test-data.actions';
import { getTests } from '../../modules/tests/tests.reducer';
import { fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';
import {
  manoeuvreCompetencyLabels,
  manoeuvreTypeLabels,
} from './components/manoeuvre-competency/manoeuvre-competency.constants';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { legalRequirementsLabels, legalRequirementToggleValues }
  from '../../shared/constants/legal-requirements/catb-legal-requirements';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import { getEco, getTestRequirements } from '../../modules/tests/test-data/test-data.selector';
import { Eco, TestRequirements } from '@dvsa/mes-test-schema/categories/B';

@Injectable()
export class TestReportAnalyticsEffects {

  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics();
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
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testReportActions.ToggleRemoveFaultMode, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.SELECT_REMOVE_MODE, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  toggleSeriousFaultMode$ = this.actions$.pipe(
    ofType(testReportActions.TOGGLE_SERIOUS_FAULT_MODE),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testReportActions.ToggleSeriousFaultMode, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.SELECT_SERIOUS_MODE, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  toggleDangerousFaultMode$ = this.actions$.pipe(
    ofType(testReportActions.TOGGLE_DANGEROUS_FAULT_MODE),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testReportActions.ToggleDangerousFaultMode, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.SELECT_DANGEROUS_MODE, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  addDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.AddDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests),
        fullCompetencyLabels[action.payload.competency],
        action.payload.newFaultCount,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  addSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.AddSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests),
        fullCompetencyLabels[action.payload],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  addDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.AddDangerousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests),
        fullCompetencyLabels[action.payload],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  addManoeuvreDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_MANOEUVRE_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.AddManoeuvreDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests),
        `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  addManoeuvreSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_MANOEUVRE_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.AddManoeuvreSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests),
        `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  addManoeuvreDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_MANOEUVRE_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.AddManoeuvreDangerousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests),
        `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  controlledStopAddDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.CONTROLLED_STOP_ADD_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.ControlledStopAddDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests),
        fullCompetencyLabels['outcomeControlledStop'],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  controlledStopAddSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.ControlledStopAddSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests),
        fullCompetencyLabels['outcomeControlledStop'],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  controlledStopAddDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.ControlledStopAddDangerousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests),
        fullCompetencyLabels['outcomeControlledStop'],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  showMeQuestionDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.ShowMeQuestionDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests),
        fullCompetencyLabels['showMeQuestion'],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  showMeQuestionSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.ShowMeQuestionSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests),
        fullCompetencyLabels['showMeQuestion'],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  showMeQuestionDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.ShowMeQuestionDangerousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests),
        fullCompetencyLabels['showMeQuestion'],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  removeDrivingFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.RemoveDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REMOVE_DRIVING_FAULT, tests),
        fullCompetencyLabels[action.payload.competency],
        action.payload.newFaultCount,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  removeSeriousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.RemoveSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REMOVE_SERIOUS_FAULT, tests),
        fullCompetencyLabels[action.payload],
        0,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  removeDangerousFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.RemoveDangerousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REMOVE_DANGEROUS_FAULT, tests),
        fullCompetencyLabels[action.payload],
        0,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  removeManoeuvreFault$ = this.actions$.pipe(
    ofType(
      testDataActions.REMOVE_MANOEUVRE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.RemoveManoeuvreFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REMOVE_DRIVING_FAULT, tests),
        `${manoeuvreTypeLabels[action.payload.manoeuvre]} - ${manoeuvreCompetencyLabels[action.payload.competency]}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  controlledStopRemoveFault$ = this.actions$.pipe(
    ofType(
      testDataActions.CONTROLLED_STOP_REMOVE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.ControlledStopRemoveFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REMOVE_FAULT, tests),
        fullCompetencyLabels['outcomeControlledStop'],
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  showMeQuestionRemoveFault$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_REMOVE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.ShowMeQuestionRemoveFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REMOVE_FAULT, tests),
        fullCompetencyLabels['showMeQuestion'],
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  testTermination$ = this.actions$.pipe(
    ofType(
      testReportActions.TERMINATE_TEST_FROM_TEST_REPORT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testReportActions.TerminateTestFromTestReport, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TERMINATION, tests),
        formatAnalyticsText(AnalyticsEvents.END_TEST, tests),
        AnalyticsLabels.TERMINATE_TEST,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  toggleLegalRequirement$ = this.actions$.pipe(
    ofType(
      testDataActions.TOGGLE_LEGAL_REQUIREMENT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestData),
          select(getTestRequirements),
        ),
      ),
    )),
    concatMap(
      ([action, tests, testRequirements]: [testDataActions.ToggleLegalRequirement, TestsModel, TestRequirements]) => {
        const toggleValue = testRequirements[action.payload]
          ? legalRequirementToggleValues.completed
          : legalRequirementToggleValues.uncompleted;
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
          `${legalRequirementsLabels[action.payload]} - ${toggleValue}`,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  toggleEco$ = this.actions$.pipe(
    ofType(
      testDataActions.TOGGLE_ECO,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestData),
          select(getEco),
        ),
      ),
    )),
    concatMap(([action, tests, eco]: [testDataActions.ToggleEco, TestsModel, Eco]) => {
      const toggleValue = eco.completed
        ? legalRequirementToggleValues.completed
        : legalRequirementToggleValues.uncompleted;
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
        `${legalRequirementsLabels['eco']} - ${toggleValue}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  manoeuvreCompletedEffect$ = this.actions$.pipe(
    ofType(
      testDataActions.RECORD_MANOEUVRES_SELECTION,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [testDataActions.TogglePlanningEco, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
        `${legalRequirementsLabels['manoeuvre']} - ${legalRequirementToggleValues.completed}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  showMeQuestionCompletedEffect$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_PASSED,
      testDataActions.SHOW_ME_QUESTION_DRIVING_FAULT,
      testDataActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
      testDataActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.TogglePlanningEco, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
        `${legalRequirementsLabels['vehicleChecks']} - ${legalRequirementToggleValues.completed}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  showMeQuestionUncompletedEffect$ = this.actions$.pipe(
    ofType(
      testDataActions.SHOW_ME_QUESTION_REMOVE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testDataActions.TogglePlanningEco, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
        `${legalRequirementsLabels['vehicleChecks']} - ${legalRequirementToggleValues.uncompleted}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

}
