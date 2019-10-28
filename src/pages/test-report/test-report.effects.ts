import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, map, concatMap, delay, filter } from 'rxjs/operators';
import { TestReportValidatorProvider } from '../../providers/test-report-validator/test-report-validator';
import { Store, select, Action } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, isTestReportPracticeTest } from '../../modules/tests/tests.selector';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import { getCatBLegalRequirements } from '../../modules/tests/test-data/test-data.selector';
import * as testReportActions from './test-report.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import * as testRequirementsActions from '../../modules/tests/test-data/test-requirements/test-requirements.actions';
import * as manoeuvresActions from '../../modules/tests/test-data/manoeuvres/manoeuvres.actions';
import * as vehicleChecksActions from '../../modules/tests/test-data/vehicle-checks/vehicle-checks.actions';
import * as ecoActions from '../../modules/tests/test-data/eco/eco.actions';
import * as etaActions from '../../modules/tests/test-data/eta/eta.actions';
import * as dangerousFaultsActions from '../../modules/tests/test-data/dangerous-faults/dangerous-faults.actions';
import * as seriousFaultsActions from '../../modules/tests/test-data/serious-faults/serious-faults.actions';
import * as drivingFaultsActions from '../../modules/tests/test-data/driving-faults/driving-faults.actions';
import * as controlledStopActions from '../../modules/tests/test-data/controlled-stop/controlled-stop.actions';
import * as activityCodeActions from '../../modules/tests/activity-code/activity-code.actions';
import { TestResultProvider } from '../../providers/test-result/test-result';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { of } from 'rxjs/observable/of';
import { isEmpty } from 'lodash';

@Injectable()
export class TestReportEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
    private testReportValidator: TestReportValidatorProvider,
    private testResultProvider: TestResultProvider,
    ) {}

  @Effect()
  validateCatBLegalRequirements$ = this.actions$.pipe(
    ofType(
      testReportActions.TEST_REPORT_VIEW_DID_ENTER,
      testRequirementsActions.TOGGLE_LEGAL_REQUIREMENT,
      manoeuvresActions.RECORD_MANOEUVRES_SELECTION,
      ecoActions.TOGGLE_ECO,
      ecoActions.TOGGLE_PLANNING_ECO,
      ecoActions.TOGGLE_CONTROL_ECO,
      vehicleChecksActions.SHOW_ME_QUESTION_PASSED,
      vehicleChecksActions.SHOW_ME_QUESTION_REMOVE_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_DRIVING_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestData),
          map(getCatBLegalRequirements),
        ),
      ),
    )),
    concatMap(([action, catBLegalRequirements]) => {
      return this.testReportValidator.validateCatBLegalRequirements(catBLegalRequirements)
        .pipe(
          map((result: boolean) => new testReportActions.ValidateLegalRequirements(result)),
        );
    }),
  );

  @Effect()
  validateCatBTestEta$ = this.actions$.pipe(
    ofType(
      dangerousFaultsActions.ADD_DANGEROUS_FAULT,
      dangerousFaultsActions.REMOVE_DANGEROUS_FAULT,
      seriousFaultsActions.ADD_SERIOUS_FAULT,
      seriousFaultsActions.REMOVE_SERIOUS_FAULT,
      etaActions.TOGGLE_ETA,
      manoeuvresActions.ADD_MANOEUVRE_SERIOUS_FAULT,
      manoeuvresActions.ADD_MANOEUVRE_DANGEROUS_FAULT,
      manoeuvresActions.REMOVE_MANOEUVRE_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_PASSED,
      controlledStopActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT,
      controlledStopActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT,
      controlledStopActions.CONTROLLED_STOP_REMOVE_FAULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getTestData),
        ),
      ),
    )),
    concatMap(([action, testData]) => {
      return this.testReportValidator.validateETACatB(testData)
        .pipe(
          map((result: boolean) => new testReportActions.ValidateEta(result)),
        );
    }),
  );

  @Effect()
  calculateTestResult$ = this.actions$.pipe(
    ofType(
      testReportActions.CALCULATE_TEST_RESULT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          map(getCurrentTest),
        ),
      ),
    )),
    switchMap(([action, currentTest]) => {
      return this.testResultProvider.calculateCatBTestResult(currentTest.testData as CatBUniqueTypes.TestData)
        .pipe(
          switchMap((result: ActivityCode) => {

            const actions: Action[] = [new activityCodeActions.SetActivityCode(result)];
            if (!isEmpty(currentTest.activityCode) && currentTest.activityCode !== result) {
              const label = result === '1' ? 'fail to pass' : 'pass to fail';
              actions.push(new testsActions.TestOutcomeChanged(label));
            }

            return actions;
          }),
        );
    }),
  );

  @Effect()
  persistTestReport$ = this.actions$.pipe(
    ofType(
      drivingFaultsActions.ADD_DRIVING_FAULT,
      drivingFaultsActions.REMOVE_DRIVING_FAULT,
      seriousFaultsActions.REMOVE_SERIOUS_FAULT,
      seriousFaultsActions.ADD_SERIOUS_FAULT,
      dangerousFaultsActions.ADD_DANGEROUS_FAULT,
      dangerousFaultsActions.REMOVE_DANGEROUS_FAULT,
      manoeuvresActions.RECORD_MANOEUVRES_SELECTION,
      manoeuvresActions.ADD_MANOEUVRE_DRIVING_FAULT,
      manoeuvresActions.ADD_MANOEUVRE_SERIOUS_FAULT,
      manoeuvresActions.ADD_MANOEUVRE_DANGEROUS_FAULT,
      manoeuvresActions.REMOVE_MANOEUVRE_FAULT,
      controlledStopActions.TOGGLE_CONTROLLED_STOP,
      controlledStopActions.CONTROLLED_STOP_ADD_DRIVING_FAULT,
      controlledStopActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT,
      controlledStopActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT,
      controlledStopActions.CONTROLLED_STOP_REMOVE_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_PASSED,
      vehicleChecksActions.SHOW_ME_QUESTION_DRIVING_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
      vehicleChecksActions.SHOW_ME_QUESTION_REMOVE_FAULT,
      ecoActions.TOGGLE_ECO,
      ecoActions.TOGGLE_CONTROL_ECO,
      ecoActions.TOGGLE_PLANNING_ECO,
      etaActions.TOGGLE_ETA,
      testRequirementsActions.TOGGLE_LEGAL_REQUIREMENT,
    ),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          map(isTestReportPracticeTest),
        ),
      ),
    )),
    filter(([action, isTestReportPracticeTest]) => !isTestReportPracticeTest),
    delay(1000), // Added a 1 second delay to allow other action to complete/effects to fire
    map(() => new testsActions.PersistTests()),
  );

  @Effect()
  terminateTestFromTestReport$ = this.actions$.pipe(
    ofType(
      testReportActions.TERMINATE_TEST_FROM_TEST_REPORT,
    ),
    map(() => new activityCodeActions.SetActivityCode(null)),
  );
}
