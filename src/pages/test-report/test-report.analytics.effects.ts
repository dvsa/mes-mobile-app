import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, AnalyticsLabels,
} from '../../providers/analytics/analytics.model';
import * as testReportActions from '../../pages/test-report/test-report.actions';
import * as controlledStopActions from '../../modules/tests/test-data/common/controlled-stop/controlled-stop.actions';
import * as highwayCodeSafetyActions
  from '../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.actions';
import * as dangerousFaultsActions
  from '../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import * as drivingFaultsActions from '../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import * as seriousFaultsActions from '../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import * as manoeuvresActions from '../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import * as manoeuvresADIPart2Actions from '../../modules/tests/test-data/cat-adi-part2/manoeuvres/manoeuvres.actions';
import * as vehicleChecksActions from '../../modules/tests/test-data/cat-b/vehicle-checks/vehicle-checks.actions';
import * as testRequirementsActions
  from '../../modules/tests/test-data/common/test-requirements/test-requirements.actions';
import * as ecoActions from '../../modules/tests/test-data/common/eco/eco.actions';
import { getTests } from '../../modules/tests/tests.reducer';
import { fullCompetencyLabels, competencyLabels } from '../../shared/constants/competencies/competencies';
import {
  manoeuvreCompetencyLabels,
  manoeuvreTypeLabels,
} from '../../shared/constants/competencies/catb-manoeuvres';
import { AnalyticRecorded, AnalyticNotRecorded } from '../../providers/analytics/analytics.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { legalRequirementsLabels, legalRequirementToggleValues }
  from '../../shared/constants/legal-requirements/legal-requirements.constants';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTestData } from '../../modules/tests/test-data/cat-b/test-data.reducer';
import { getEco, getTestRequirements, getETA } from '../../modules/tests/test-data/common/test-data.selector';
import { Eco, TestRequirements, ETA } from '@dvsa/mes-test-schema/categories/common';
import * as uncoupleRecoupleActions
  from '../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';
import * as reverseLeftActions from './components/reverse-left/reverse-left.actions';
import { getTestData as getCatAmod1TestData } from
  '../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getAvoidance } from '../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.selector';
import { Avoidance, EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';
import { speedCheckToggleValues } from '../../shared/constants/competencies/cata-mod1-speed-checks';
import { getEmergencyStop } from '../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.selector';
import * as activityCodeActions from '../../modules/tests/activity-code/activity-code.actions';
import * as testReportCatAMod1Actions from './cat-a-mod1/test-report.cat-a-mod1.actions';
import { ModalReason } from './cat-a-mod1/components/activity-code-4-modal/activity-code-4-modal.constants';
import * as singleFaultCompetencyActions from
  '../../modules/tests/test-data/common/single-fault-competencies/single-fault-competencies.actions';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import * as emergencyStopActions from '../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import * as avoidanceActions from '../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import * as pcvDoorExerciseActions from
  '../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.actions';
import {
  getControlledStop,
} from '../../modules/tests/test-data/common/controlled-stop/controlled-stop.reducer';
import {
  getHighwayCodeSafety,
} from '../../modules/tests/test-data/common/highway-code-safety/highway-code-safety.reducer';
import {
  ControlledStopUnion,
  HighwayCodeSafetyUnion,
} from '../../shared/unions/test-schema-unions';

import * as etaActions from '../../modules/tests/test-data/common/eta/eta.actions';
import { ExaminerActions } from '../../modules/tests/test-data/test-data.constants';

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
      this.analytics.setCurrentPage(formatAnalyticsText(AnalyticsScreenNames.TEST_REPORT, tests));
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
      if (!action.isUserGenerated) {
        return of(new AnalyticNotRecorded());
      }

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
      if (!action.isUserGenerated) {
        return of(new AnalyticNotRecorded());
      }

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
      if (!action.isUserGenerated) {
        return of(new AnalyticNotRecorded());
      }
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
  addManoeuvreDrivingFaultCatADIPart2$ = this.actions$.pipe(
    ofType(
      manoeuvresADIPart2Actions.ADD_MANOEUVRE_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [manoeuvresADIPart2Actions.AddManoeuvreDrivingFault, TestsModel]) => {
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
  addManoeuvreSeriousFaultCatADIPart2$ = this.actions$.pipe(
    ofType(
      manoeuvresADIPart2Actions.ADD_MANOEUVRE_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [manoeuvresADIPart2Actions.AddManoeuvreSeriousFault, TestsModel]) => {
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
  addManoeuvreDangerousFaultCatADIPart2$ = this.actions$.pipe(
    ofType(
      manoeuvresADIPart2Actions.ADD_MANOEUVRE_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [manoeuvresADIPart2Actions.AddManoeuvreDangerousFault, TestsModel]) => {
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
  highwayCodeSafetyAddDrivingFault$ = this.actions$.pipe(
    ofType(
      highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [highwayCodeSafetyActions.HighwayCodeSafetyAddDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_DRIVING_FAULT, tests),
        fullCompetencyLabels['outcomeHighwayCodeSafety'],
        1,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  highwayCodeSafetyAddSeriousFault$ = this.actions$.pipe(
    ofType(
      highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_ADD_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [highwayCodeSafetyActions.HighwayCodeSafetyAddSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_FAULT, tests),
        fullCompetencyLabels['outcomeHighwayCodeSafety'],
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
  removeManoeuvreFaultCatADIPart2$ = this.actions$.pipe(
    ofType(
      manoeuvresADIPart2Actions.REMOVE_MANOEUVRE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [manoeuvresADIPart2Actions.RemoveManoeuvreFault, TestsModel]) => {
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
  highwayCodeSafetyRemoveFault$ = this.actions$.pipe(
    ofType(
      highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_REMOVE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [highwayCodeSafetyActions.HighwayCodeSafetyRemoveFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.REMOVE_FAULT, tests),
        fullCompetencyLabels['outcomeHighwayCodeSafety'],
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
  toggleEcoControl$ = this.actions$.pipe(
    ofType(
      ecoActions.TOGGLE_CONTROL_ECO,
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
      const toggleValue = eco.adviceGivenControl
        ? 'selected'
        : 'unselected';
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_ECO_CONTROL, tests),
        `${toggleValue}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  toggleEcoPlanning$ = this.actions$.pipe(
    ofType(
      ecoActions.TOGGLE_PLANNING_ECO,
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
      const toggleValue = eco.adviceGivenPlanning
        ? 'selected'
        : 'unselected';
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_ECO_PLANNING, tests),
        `${toggleValue}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  toggleETA$ = this.actions$.pipe(
    ofType(
      etaActions.TOGGLE_ETA,
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
          select(getETA),
        ),
      ),
    )),
    concatMap(([action, tests, eta]: [etaActions.ToggleETA, TestsModel, ETA]) => {

      const event: string = action.payload === ExaminerActions.physical ?
        AnalyticsEvents.TOGGLE_ETA_PHYSICAL : AnalyticsEvents.TOGGLE_ETA_VERBAL;

      const etaValue: boolean = action.payload === ExaminerActions.physical ? eta.physical : eta.verbal;

      const toggleValue = etaValue
        ? 'selected'
        : 'unselected';
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(event, tests),
        `${toggleValue}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  toggleControlledStop$ = this.actions$.pipe(
    ofType(
      controlledStopActions.TOGGLE_CONTROLLED_STOP,
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
          select(getControlledStop),
        ),
      ),
    )),
    concatMap(([action, tests, controlledStop]:
      [controlledStopActions.ToggleControlledStop, TestsModel, ControlledStopUnion]) => {
      const toggleValue = controlledStop.selected
        ? legalRequirementToggleValues.completed
        : legalRequirementToggleValues.uncompleted;
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_CONTROLLED_STOP, tests),
        `${toggleValue}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  toggleHighwayCodeSafety$ = this.actions$.pipe(
    ofType(
      highwayCodeSafetyActions.TOGGLE_HIGHWAYCODE_SAFETY,
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
          select(getHighwayCodeSafety),
        ),
      ),
    )),
    concatMap(([action, tests, highwayCodeSafety]:
      [highwayCodeSafetyActions.ToggleHighwayCodeSafety, TestsModel, HighwayCodeSafetyUnion]) => {
      const toggleValue = highwayCodeSafety.selected
        ? legalRequirementToggleValues.completed
        : legalRequirementToggleValues.uncompleted;
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
        `${legalRequirementsLabels.highwayCodeSafety} - ${toggleValue}`,
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
  manoeuvreCompletedEffectCatADIPart2$ = this.actions$.pipe(
    ofType(
      manoeuvresADIPart2Actions.RECORD_MANOEUVRES_SELECTION,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [manoeuvresADIPart2Actions.RecordManoeuvresSelection, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
        `${legalRequirementsLabels['manoeuvre']} - ${legalRequirementToggleValues.completed}`,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  deselectReverseLeftManoeuvreEffect$ = this.actions$.pipe(
    ofType(manoeuvresActions.RECORD_MANOEUVRES_DESELECTION),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [manoeuvresActions.RecordManoeuvresDeselection, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TOGGLE_LEGAL_REQUIREMENT, tests),
        `${legalRequirementsLabels['manoeuvre']} - ${legalRequirementToggleValues.uncompleted}`,
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

  @Effect()
  toggleAvoidanceSpeedReq$ = this.actions$.pipe(
    ofType(
      avoidanceActions.ADD_AVOIDANCE_SERIOUS_FAULT,
      avoidanceActions.REMOVE_AVOIDANCE_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]) => {
        const toggleValue = action.type === avoidanceActions.ADD_AVOIDANCE_SERIOUS_FAULT ?
          speedCheckToggleValues.speedNotMet : speedCheckToggleValues.speedMet;
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.TOGGLE_AVOIDANCE_SPEED_REQUIREMENT, tests),
          `${competencyLabels['speedCheckAvoidance']} - ${toggleValue}`,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  recordAvoidanceFirstAttempt$ = this.actions$.pipe(
    ofType(
      avoidanceActions.RECORD_AVOIDANCE_FIRST_ATTEMPT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getCatAmod1TestData),
          select(getAvoidance),
        ),
      ),
    )),
    concatMap(
      ([action, tests, avoidance]:
        [avoidanceActions.RecordAvoidanceFirstAttempt, TestsModel, Avoidance]) => {
        const attemptValue = avoidance.firstAttempt;
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.RECORD_AVOIDANCE_FIRST_ATTEMPT, tests),
          `${competencyLabels['speedCheckAvoidance']} - ${attemptValue}`,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  recordAvoidanceSecondAttempt$ = this.actions$.pipe(
    ofType(
      avoidanceActions.RECORD_AVOIDANCE_SECOND_ATTEMPT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getCatAmod1TestData),
          select(getAvoidance),
        ),
      ),
    )),
    concatMap(
      ([action, tests, avoidance]:
        [avoidanceActions.RecordAvoidanceSecondAttempt, TestsModel, Avoidance]) => {
        const attemptValue = avoidance.secondAttempt;
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.RECORD_AVOIDANCE_SECOND_ATTEMPT, tests),
          `${competencyLabels['speedCheckAvoidance']} - ${attemptValue}`,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  toggleEmergencyStopSpeedReq$ = this.actions$.pipe(
    ofType(
      emergencyStopActions.ADD_EMERGENCY_STOP_SERIOUS_FAULT,
      emergencyStopActions.REMOVE_EMERGENCY_STOP_SERIOUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]) => {
        const toggleValue = action.type === emergencyStopActions.ADD_EMERGENCY_STOP_SERIOUS_FAULT ?
          speedCheckToggleValues.speedNotMet : speedCheckToggleValues.speedMet;
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.TOGGLE_EMERGENCY_STOP_SPEED_REQ, tests),
          `${competencyLabels['speedCheckEmergency']} - ${toggleValue}`,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  recordEmergencyStopFirstAttempt$ = this.actions$.pipe(
    ofType(
      emergencyStopActions.RECORD_EMERGENCY_STOP_FIRST_ATTEMPT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getCatAmod1TestData),
          select(getEmergencyStop),
        ),
      ),
    )),
    concatMap(
      ([action, tests, emergencyStop]:
        [emergencyStopActions.RecordEmergencyStopFirstAttempt, TestsModel, EmergencyStop]) => {
        const attemptValue = emergencyStop.firstAttempt;
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.RECORD_EMERGENCY_STOP_FIRST_ATTEMPT, tests),
          `${competencyLabels['speedCheckEmergency']} - ${attemptValue}`,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  recordEmergencyStopSecondAttempt$ = this.actions$.pipe(
    ofType(
      emergencyStopActions.RECORD_EMERGENCY_STOP_SECOND_ATTEMPT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getCatAmod1TestData),
          select(getEmergencyStop),
        ),
      ),
    )),
    concatMap(
      ([action, tests, emergencyStop]:
        [emergencyStopActions.RecordEmergencyStopSecondAttempt, TestsModel, EmergencyStop]) => {
        const attemptValue = emergencyStop.secondAttempt;
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.RECORD_EMERGENCY_STOP_SECOND_ATTEMPT, tests),
          `${competencyLabels['speedCheckEmergency']} - ${attemptValue}`,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  setActivityCode$ = this.actions$.pipe(
    ofType(
      activityCodeActions.SET_ACTIVITY_CODE,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [activityCodeActions.SetActivityCode, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TERMINATION, tests),
        formatAnalyticsText(AnalyticsEvents.END_TEST, tests),
        AnalyticsLabels.SET_ACTIVITY_CODE,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  speedRequirementNotMetModalOpened$ = this.actions$.pipe(
    ofType(
      testReportCatAMod1Actions.SPEED_REQ_NOT_MET_MODAL_OPENED,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]:
        [testReportCatAMod1Actions.SpeedRequirementNotMetModalOpened, TestsModel]) => {
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.SPEED_REQ_NOT_MET_MODAL_OPENED, tests),
          ModalReason.SPEED_REQUIREMENTS,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  emergencyStopDangerousFaultModelOpened$ = this.actions$.pipe(
    ofType(
      testReportCatAMod1Actions.EMERGENCY_STOP_DANGEROUS_FAULT_MODAL_OPENED,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]:
        [testReportCatAMod1Actions.EmergencyStopDangerousFaultModelOpened, TestsModel]) => {
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.EMERGENCY_STOP_DANGEROUS_FAULT_MODAL_OPENED, tests),
          ModalReason.EMERGENCY_STOP_DANGEROUS,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  emergencyStopSeriousFaultModelOpened$ = this.actions$.pipe(
    ofType(
      testReportCatAMod1Actions.EMERGENCY_STOP_SERIOUS_FAULT_MODAL_OPENED,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]:
        [testReportCatAMod1Actions.EmergencyStopSeriousFaultModelOpened, TestsModel]) => {
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.EMERGENCY_STOP_SERIOUS_FAULT_MODAL_OPENED, tests),
          ModalReason.EMERGENCY_STOP_SERIOUS,
        );
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  setSingleFaultCompetencyOutcome$ = this.actions$.pipe(
    ofType(
      singleFaultCompetencyActions.SET_SINGLE_FAULT_COMPETENCY_OUTCOME,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]:
        [singleFaultCompetencyActions.SetSingleFaultCompetencyOutcome, TestsModel]) => {
        if (action.outcome === CompetencyOutcome.DF) {
          this.analytics.logEvent(
            formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
            formatAnalyticsText(AnalyticsEvents.ADD_SINGLE_FAULT, tests),
            fullCompetencyLabels[action.competencyName],
          );
        } else if (action.outcome === CompetencyOutcome.D) {
          this.analytics.logEvent(
            formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
            formatAnalyticsText(AnalyticsEvents.ADD_DANGEROUS_SINGLE_FAULT, tests),
            fullCompetencyLabels[action.competencyName],
          );
        } else if (action.outcome === CompetencyOutcome.S) {
          this.analytics.logEvent(
            formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
            formatAnalyticsText(AnalyticsEvents.ADD_SERIOUS_SINGLE_FAULT, tests),
            fullCompetencyLabels[action.competencyName],
          );
        }
        return of(new AnalyticRecorded());
      }),
  );

  @Effect()
  removeSingleFaultCompetencyOutcome$ = this.actions$.pipe(
    ofType(singleFaultCompetencyActions.REMOVE_SINGLE_FAULT_COMPETENCY_OUTCOME),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]: [singleFaultCompetencyActions.RemoveSingleFaultCompetencyOutcome, TestsModel]) => {
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.REMOVE_SINGLE_FAULT, tests),
          fullCompetencyLabels[action.competencyName],
        );
        return of(new AnalyticRecorded());
      }),
  );

  @Effect()
  removeSingleDangerousFaultCompetencyOutcome$ = this.actions$.pipe(
    ofType(singleFaultCompetencyActions.REMOVE_SINGLE_DANGEROUS_FAULT_COMPETENCY_OUTCOME),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]: [singleFaultCompetencyActions.RemoveSingleDangerousFaultCompetencyOutcome, TestsModel]) => {
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.REMOVE_DANGEROUS_SINGLE_FAULT, tests),
          fullCompetencyLabels[action.competencyName],
        );
        return of(new AnalyticRecorded());
      }),
  );

  @Effect()
  removeSingleSeriousFaultCompetencyOutcome$ = this.actions$.pipe(
    ofType(singleFaultCompetencyActions.REMOVE_SINGLE_SERIOUS_FAULT_COMPETENCY_OUTCOME),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(
      ([action, tests]: [singleFaultCompetencyActions.RemoveSingleSeriousFaultCompetencyOutcome, TestsModel]) => {
        this.analytics.logEvent(
          formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
          formatAnalyticsText(AnalyticsEvents.REMOVE_SERIOUS_SINGLE_FAULT, tests),
          fullCompetencyLabels[action.competencyName],
        );
        return of(new AnalyticRecorded());
      }),
  );

  @Effect()
  pcvDoorExerciseAddDrivingFault$ = this.actions$.pipe(
    ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [pcvDoorExerciseActions.PcvDoorExerciseAddDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT, tests),
        fullCompetencyLabels.pcvDoorExercise,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  pcvDoorExerciseAddSeriousFault$ = this.actions$.pipe(
    ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [pcvDoorExerciseActions.PcvDoorExerciseAddSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT, tests),
        fullCompetencyLabels.pcvDoorExercise,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  pcvDoorExerciseAddDangerousFault$ = this.actions$.pipe(
    ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [pcvDoorExerciseActions.PcvDoorExerciseAddDangerousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT, tests),
        fullCompetencyLabels.pcvDoorExercise,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  pcvDoorExerciseRemoveDrivingFault$ = this.actions$.pipe(
    ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [pcvDoorExerciseActions.PcvDoorExerciseRemoveDrivingFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT, tests),
        fullCompetencyLabels.pcvDoorExercise,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  pcvDoorExerciseRemoveSeriousFault$ = this.actions$.pipe(
    ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [pcvDoorExerciseActions.PcvDoorExerciseRemoveSeriousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT, tests),
        fullCompetencyLabels.pcvDoorExercise,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  pcvDoorExerciseRemoveDangerousFault$ = this.actions$.pipe(
    ofType(pcvDoorExerciseActions.PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [pcvDoorExerciseActions.PcvDoorExerciseRemoveDangerousFault, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT, tests),
        fullCompetencyLabels.pcvDoorExercise,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  startTimer$ = this.actions$.pipe(
    ofType(testReportActions.START_TIMER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [testReportActions.StartTimer, TestsModel]) => {
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.START_TIMER, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

}
