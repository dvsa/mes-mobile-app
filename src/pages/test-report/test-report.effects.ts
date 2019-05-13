import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, map, concatMap, delay } from 'rxjs/operators';
import { TestReportValidatorProvider } from '../../providers/test-report-validator/test-report-validator';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import { getCatBLegalRequirements } from '../../modules/tests/test-data/test-data.selector';
import * as testReportActions from './test-report.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import * as  testDataActions from '../../modules/tests/test-data/test-data.actions';
import { TestResultProvider } from '../../providers/test-result/test-result';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';

@Injectable()
export class TestReportEffects {

  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
    private testReportValidator: TestReportValidatorProvider,
    private testResultProvider: TestResultProvider,
    ) {}

  @Effect()
  validateCatBTest$ = this.actions$.pipe(
    ofType(
      testReportActions.TEST_REPORT_VIEW_DID_ENTER,
      testDataActions.TOGGLE_LEGAL_REQUIREMENT,
      testDataActions.RECORD_MANOEUVRES_SELECTION,
      testDataActions.TOGGLE_ECO,
      testDataActions.TOGGLE_PLANNING_ECO,
      testDataActions.TOGGLE_CONTROL_ECO,
      testDataActions.SHOW_ME_QUESTION_PASSED,
      testDataActions.SHOW_ME_QUESTION_REMOVE_FAULT,
      testDataActions.SHOW_ME_QUESTION_DRIVING_FAULT,
      testDataActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
      testDataActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        map(getCatBLegalRequirements),
      ),
    ),
    concatMap(([action, catBLegalRequirements]) => {
      return this.testReportValidator.validateCatBTestReport(catBLegalRequirements)
        .pipe(
          map((result: boolean) => new testReportActions.ValidateTestResult(result)),
        );
    }),
  );

  @Effect()
  calculateTestResult$ = this.actions$.pipe(
    ofType(
      testReportActions.CALCULATE_TEST_RESULT,
    ),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        map(getCurrentTest),
      ),
    ),
    switchMap(([action, currentTest]) => {
      return this.testResultProvider.calculateCatBTestResult(currentTest.testData)
        .pipe(
          map((result: ActivityCode) => new testsActions.SetActivityCode(result)),
        );
    }),
  );

  @Effect()
  persistTestReport$ = this.actions$.pipe(
    ofType(
      testDataActions.ADD_DRIVING_FAULT,
      testDataActions.ADD_DANGEROUS_FAULT,
      testDataActions.ADD_SERIOUS_FAULT,
      testDataActions.REMOVE_DRIVING_FAULT,
      testDataActions.REMOVE_SERIOUS_FAULT,
      testDataActions.REMOVE_DANGEROUS_FAULT,
      testDataActions.RECORD_MANOEUVRES_SELECTION,
      testDataActions.ADD_MANOEUVRE_DRIVING_FAULT,
      testDataActions.ADD_MANOEUVRE_SERIOUS_FAULT,
      testDataActions.ADD_MANOEUVRE_DANGEROUS_FAULT,
      testDataActions.REMOVE_MANOEUVRE_FAULT,
      testDataActions.TOGGLE_CONTROLLED_STOP,
      testDataActions.CONTROLLED_STOP_ADD_DRIVING_FAULT,
      testDataActions.CONTROLLED_STOP_ADD_SERIOUS_FAULT,
      testDataActions.CONTROLLED_STOP_ADD_DANGEROUS_FAULT,
      testDataActions.CONTROLLED_STOP_REMOVE_FAULT,
      testDataActions.SHOW_ME_QUESTION_PASSED,
      testDataActions.SHOW_ME_QUESTION_DRIVING_FAULT,
      testDataActions.SHOW_ME_QUESTION_SERIOUS_FAULT,
      testDataActions.SHOW_ME_QUESTION_DANGEROUS_FAULT,
      testDataActions.SHOW_ME_QUESTION_REMOVE_FAULT,
      testDataActions.TOGGLE_ECO,
      testDataActions.TOGGLE_CONTROL_ECO,
      testDataActions.TOGGLE_PLANNING_ECO,
      testDataActions.TOGGLE_ETA,
      testDataActions.TOGGLE_LEGAL_REQUIREMENT,
    ),
    delay(1000), // Added a 1 second delay to allow other actions to complete/effects to fire
    map(() => new testsActions.PersistTests()),
  );
}
