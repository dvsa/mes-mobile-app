import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportEffects } from '../test-report.effects';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import * as ecoActions from '../../../modules/tests/test-data/eco/eco.actions';
import * as etaActions from '../../../modules/tests/test-data/eta/eta.actions';
import * as dangerousFaultsActions from '../../../modules/tests/test-data/dangerous-faults/dangerous-faults.actions';
import * as seriousFaultsActions from '../../../modules/tests/test-data/serious-faults/serious-faults.actions';
import * as manoeuvresActions from '../../../modules/tests/test-data/manoeuvres/manoeuvres.actions';
import * as vehicleChecksActions from '../../../modules/tests/test-data/vehicle-checks/vehicle-checks.actions';
import * as controlledStopActions from '../../../modules/tests/test-data/controlled-stop/controlled-stop.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as testReportActions from '../test-report.actions';
import * as activityCodeActions from '../../../modules/tests/activity-code/activity-code.actions';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { of } from 'rxjs/observable/of';
import {
  ExaminerActions,
  Competencies,
  ManoeuvreCompetencies,
  ManoeuvreTypes,
} from '../../../modules/tests/test-data/test-data.constants';
import { TestCategory } from '../../../shared/models/test-category';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

describe('Test Report Effects', () => {

  let effects: TestReportEffects;
  let actions$: any;
  let testReportValidatorProvider: TestReportValidatorProvider;
  let testResultProvider: TestResultProvider;
  let store$: Store<StoreModel>;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        TestReportEffects,
        provideMockActions(() => actions$),
        TestReportValidatorProvider,
        TestResultProvider,
        FaultCountProvider,
        Store,
      ],
    });
    testReportValidatorProvider = TestBed.get(TestReportValidatorProvider);
    testResultProvider = TestBed.get(TestResultProvider);
    effects = TestBed.get(TestReportEffects);
    store$ = TestBed.get(Store);
  });

  describe('validateCatBLegalRequirements', () => {

    beforeEach(() => {
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
    });

    it('should dispatch a success action when the effect is triggered and test is valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateCatBLegalRequirements').and.returnValue(of(true));
      // ACT
      actions$.next(new ecoActions.ToggleEco());
      // ASSERT
      effects.validateCatBLegalRequirements$.subscribe((result) => {
        expect(testReportValidatorProvider.validateCatBLegalRequirements).toHaveBeenCalled();
        expect(result).toEqual(new testReportActions.ValidateLegalRequirements(true));
        done();
      });
    });

    it('should dispatch a failure action when the effect is triggered and test is not valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateCatBLegalRequirements').and.returnValue(of(false));
      // ACT
      actions$.next(new ecoActions.ToggleEco());
      // ASSERT
      effects.validateCatBLegalRequirements$.subscribe((result) => {
        expect(testReportValidatorProvider.validateCatBLegalRequirements).toHaveBeenCalled();
        expect(result).toEqual(new testReportActions.ValidateLegalRequirements(false));
        done();
      });
    });
  });

  describe('validateCatBTestEta', () => {
    beforeEach(() => {
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
    });

    it('should dispatch a success action when the effect is triggered and the eta is valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(true));
      // ACT
      actions$.next(new dangerousFaultsActions.AddDangerousFault(Competencies.moveOffSafety));
      actions$.next(new etaActions.ToggleETA(ExaminerActions.physical));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(testReportValidatorProvider.validateETACatB).toHaveBeenCalled();
        expect(result).toEqual(new testReportActions.ValidateEta(true));
        done();
      });
    });
    it('should dispatch a failure action when the effect is triggered and the test is not valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new etaActions.ToggleETA(ExaminerActions.physical));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(testReportValidatorProvider.validateETACatB).toHaveBeenCalled();
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an ADD_DANGEROUS_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new dangerousFaultsActions.AddDangerousFault(Competencies.ancillaryControls));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an ADD_SERIOUS_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new seriousFaultsActions.AddSeriousFault(Competencies.ancillaryControls));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an REMOVE_DANGEROUS_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new dangerousFaultsActions.RemoveDangerousFault(Competencies.ancillaryControls));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an REMOVE_SERIOUS_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new seriousFaultsActions.RemoveSeriousFault(Competencies.ancillaryControls));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an TOGGLE_ETA fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new etaActions.ToggleETA(ExaminerActions.physical));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an ADD_MANOEUVRE_SERIOUS_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new manoeuvresActions.AddManoeuvreSeriousFault(
        {
          competency: ManoeuvreCompetencies.controlFault,
          manoeuvre: ManoeuvreTypes.forwardPark,
        }));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an ADD_MANOEUVRE_DANGEROUS_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new manoeuvresActions.AddManoeuvreDangerousFault(
        {
          competency: ManoeuvreCompetencies.controlFault,
          manoeuvre: ManoeuvreTypes.forwardPark,
        }));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an REMOVE_MANOEUVRE_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new manoeuvresActions.RemoveManoeuvreFault(
        {
          competency: ManoeuvreCompetencies.controlFault,
          manoeuvre: ManoeuvreTypes.forwardPark,
        }));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an SHOW_ME_QUESTION_SERIOUS_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new vehicleChecksActions.ShowMeQuestionSeriousFault());
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an SHOW_ME_QUESTION_DANGEROUS_FAULT fault is dispatched', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
      // ACT
      actions$.next(new vehicleChecksActions.ShowMeQuestionDangerousFault());
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an SHOW_ME_QUESTION_PASSED fault is dispatched', (done) => {
          // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
          // ACT
      actions$.next(new vehicleChecksActions.ShowMeQuestionPassed());
          // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an CONTROLLED_STOP_ADD_SERIOUS_FAULT fault is dispatched', (done) => {
            // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
            // ACT
      actions$.next(new controlledStopActions.ControlledStopAddSeriousFault());
            // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an CONTROLLED_STOP_ADD_DANGEROUS_FAULT fault is dispatched', (done) => {
            // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
            // ACT
      actions$.next(new controlledStopActions.ControlledStopAddDangerousFault());
            // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
    it('should trigger when an CONTROLLED_STOP_REMOVE_FAULT fault is dispatched', (done) => {
            // ARRANGE
      spyOn(testReportValidatorProvider, 'validateETACatB').and.returnValue(of(false));
            // ACT
      actions$.next(new controlledStopActions.ControlledStopRemoveFault());
            // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
  });

  describe('calculateTestResult', () => {

    beforeEach(() => {
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      store$.dispatch(new PopulateTestCategory(TestCategory.B));
    });

    it('should dispatch an action containing the correct result for a test', (done) => {
       // ARRANGE
      spyOn(testResultProvider, 'calculateCatBTestResult').and.returnValue(of(ActivityCodes.PASS));
       // ACT
      actions$.next(new testReportActions.CalculateTestResult());
       // ASSERT
      effects.calculateTestResult$.subscribe((result) => {
        expect(testResultProvider.calculateCatBTestResult).toHaveBeenCalled();
        expect(result).toEqual(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
        done();
      });
    });
  });

  describe('persistTestReport', () => {

    beforeEach(() => {
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
    });

    it('should dispatch an action requesting the test data to be saved when triggered', (done) => {
      // ACT
      actions$.next(new etaActions.ToggleETA(ExaminerActions.physical));
      // ASSERT
      effects.persistTestReport$.subscribe((result) => {
        expect(result).toEqual(new testsActions.PersistTests());
        done();
      });
    });

    it('should not dispatch an action requesting the test data to be saved when triggered', () => {
      // When something is filtered, nothing happens - the pipe function will not call the next operator.
      // TODO - think about how this could be tested
    });

  });

  describe('terminateTestReport', () => {
    beforeEach(() => {
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
    });

    it('should dispatch an action terminating the test', (done) => {
      // ACT
      actions$.next(new testReportActions.TerminateTestFromTestReport());
      // ASSERT
      effects.terminateTestFromTestReport$.subscribe((result) => {
        expect(result).toEqual(new activityCodeActions.SetActivityCode(null));
        done();
      });
    });
  });
});
