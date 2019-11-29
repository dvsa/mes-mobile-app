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
import * as controlledStopActions from '../../modules/tests/test-data/cat-b/controlled-stop/controlled-stop.actions';
import * as dangerousFaultsActions
  from '../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import * as drivingFaultsActions from '../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import * as seriousFaultsActions from '../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import * as manoeuvresActions from '../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import * as vehicleChecksActions from '../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import * as testRequirementsActions
  from '../../modules/tests/test-data/cat-b/test-requirements/test-requirements.actions';
import * as ecoActions from '../../modules/tests/test-data/common/eco/eco.actions';
import { getTests } from '../../modules/tests/tests.reducer';
import { fullCompetencyLabels } from '../../shared/constants/competencies/catb-competencies';
import {
  manoeuvreCompetencyLabels,
  manoeuvreTypeLabels,
} from '../../shared/constants/competencies/catb-manoeuvres';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { legalRequirementsLabels, legalRequirementToggleValues }
  from '../../shared/constants/legal-requirements/legal-requirements.constants';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTestData } from '../../modules/tests/test-data/cat-b/test-data.reducer';
import { getEco, getTestRequirements } from '../../modules/tests/test-data/common/test-data.selector';
import { Eco, TestRequirements } from '@dvsa/mes-test-schema/categories/Common';
import * as uncoupleRecoupleActions
  from '../../modules/tests/test-data/cat-be/uncouple-recouple/uncouple-recouple.actions';
import * as reverseLeftActions from './cat-be/components/reverse-left/reverse-left.actions';

@Injectable()
export class TestReportAnalyticsEffects {

  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  testReportViewDidEnter$ = this.actions$.pipe(
    ofType(testReportActions.TEST_REPORT_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testReportActions.TestReportViewDidEnter, TestsModel]) => {
      this.analytics.setCurrentPage(formatAnalyticsText(AnalyticsScreenNames.TEST, tests));
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
      drivingFaultsActions.ADD_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [drivingFaultsActions.AddDrivingFault, TestsModel]) => {
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
      seriousFaultsActions.ADD_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [seriousFaultsActions.AddSeriousFault, TestsModel]) => {
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
      dangerousFaultsActions.ADD_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [dangerousFaultsActions.AddDangerousFault, TestsModel]) => {
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
      manoeuvresActions.ADD_MANOEUVRE_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [manoeuvresActions.AddManoeuvreDrivingFault, TestsModel]) => {
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
      manoeuvresActions.ADD_MANOEUVRE_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [manoeuvresActions.AddManoeuvreSeriousFault, TestsModel]) => {
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
      manoeuvresActions.ADD_MANOEUVRE_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [manoeuvresActions.AddManoeuvreDangerousFault, TestsModel]) => {
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
      controlledStopActions.CONTROLLED_STOP_ADD_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [controlledStopActions.ControlledStopAddDrivingFault, TestsModel]) => {
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
      controlledStopActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [controlledStopActions.ControlledStopAddSeriousFault, TestsModel]) => {
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
      controlledStopActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [controlledStopActions.ControlledStopAddDangerousFault, TestsModel]) => {
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
      vehicleChecksActions.SHOW_ME_QUESTION_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [vehicleChecksActions.ShowMeQuestionDrivingFault, TestsModel]) => {
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
      vehicleChecksActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [vehicleChecksActions.ShowMeQuestionSeriousFault, TestsModel]) => {
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
      vehicleChecksActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [vehicleChecksActions.ShowMeQuestionDangerousFault, TestsModel]) => {
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
      drivingFaultsActions.REMOVE_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [drivingFaultsActions.RemoveDrivingFault, TestsModel]) => {
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
      seriousFaultsActions.REMOVE_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [seriousFaultsActions.RemoveSeriousFault, TestsModel]) => {
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
      dangerousFaultsActions.REMOVE_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [dangerousFaultsActions.RemoveDangerousFault, TestsModel]) => {
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
      manoeuvresActions.REMOVE_MANOEUVRE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [manoeuvresActions.RemoveManoeuvreFault, TestsModel]) => {
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
      controlledStopActions.CONTROLLED_STOP_REMOVE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [controlledStopActions.ControlledStopRemoveFault, TestsModel]) => {
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
      vehicleChecksActions.SHOW_ME_QUESTION_REMOVE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [vehicleChecksActions.ShowMeQuestionRemoveFault, TestsModel]) => {
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
      testRequirementsActions.TOGGLE_LEGAL_REQUIREMENT,
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
      ([action, tests, testRequirements]:
        [testRequirementsActions.ToggleLegalRequirement, TestsModel, TestRequirements]) => {
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
      ecoActions.TOGGLE_ECO,
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
    concatMap(([action, tests, eco]: [ecoActions.ToggleEco, TestsModel, Eco]) => {
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
      manoeuvresActions.RECORD_MANOEUVRES_SELECTION,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [manoeuvresActions.RecordManoeuvresSelection, TestsModel]) => {
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
      vehicleChecksActions.SHOW_ME_QUESTION_PASSED,
      vehicleChecksActions.SHOW_ME_QUESTION_DRIVING_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [vehicleChecksActions.Types, TestsModel]) => {
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
      vehicleChecksActions.SHOW_ME_QUESTION_REMOVE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [vehicleChecksActions.ShowMeQuestionRemoveFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
        `${legalRequirementsLabels['vehicleChecks']} - ${legalRequirementToggleValues.uncompleted}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  uncoupleRecoupleAddDrivingFault$ = this.actions$.pipe(
    ofType(
      uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [uncoupleRecoupleActions.UncoupleRecoupleAddDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests),
        'Uncouple recouple',
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  uncoupleRecoupleAddSeriousFault$ = this.actions$.pipe(
    ofType(
      uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [uncoupleRecoupleActions.UncoupleRecoupleAddSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests),
        'Uncouple recouple',
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  uncoupleRecoupleAddDangerousFault$ = this.actions$.pipe(
    ofType(
      uncoupleRecoupleActions.UNCOUPLE_RECOUPLE_ADD_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [uncoupleRecoupleActions.UncoupleRecoupleAddDangerousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_FAULT, tests),
        'Uncouple recouple',
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  reverseLeftPopoverOpened$ = this.actions$.pipe(
    ofType(reverseLeftActions.REVERSE_LEFT_POPOVER_OPENED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [reverseLeftActions.ReverseLeftPopoverOpened, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REVERSE_LEFT_POPOVER_OPENED, tests),
        );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  reverseLeftPopoverClosed$ = this.actions$.pipe(
    ofType(reverseLeftActions.REVERSE_LEFT_POPOVER_CLOSED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [reverseLeftActions.ReverseLeftPopoverClosed, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REVERSE_LEFT_POPOVER_CLOSED, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

}
