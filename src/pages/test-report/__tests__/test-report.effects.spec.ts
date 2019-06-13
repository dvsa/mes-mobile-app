import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportEffects } from '../test-report.effects';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import * as testDataActions from '../../../modules/tests/test-data/test-data.actions';
import * as journalActions from '../../journal/journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as testReportActions from '../test-report.actions';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { of } from 'rxjs/observable/of';
import { ExaminerActions, Competencies } from '../../../modules/tests/test-data/test-data.constants';

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
        Store,
      ],
    });
    testReportValidatorProvider = TestBed.get(TestReportValidatorProvider);
    testResultProvider = TestBed.get(TestResultProvider);
    effects = TestBed.get(TestReportEffects);
    store$ = TestBed.get(Store);
  });

  it('should create the test report effects', () => {
    expect(effects).toBeTruthy();
  });

  describe('validateCatBLegalRequirements', () => {

    beforeEach(() => {
      store$.dispatch(new journalActions.StartTest(123456));
    });

    it('should dispatch a success action when the effect is triggered and test is valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateCatBLegalRequirements').and.returnValue(of(true));
      // ACT
      actions$.next(new testDataActions.ToggleEco());
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
      actions$.next(new testDataActions.ToggleEco());
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
      store$.dispatch(new journalActions.StartTest(123456));
    });

    it('should dispatch a success action when the effect is triggered and the eta is valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateCatBEta').and.returnValue(of(true));
      // ACT
      actions$.next(new testDataActions.AddDangerousFault(Competencies.moveOffSafety));
      actions$.next(new testDataActions.ToggleETA(ExaminerActions.physical));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(testReportValidatorProvider.validateCatBEta).toHaveBeenCalled();
        expect(result).toEqual(new testReportActions.ValidateEta(true));
        done();
      });
    });

    it('should dispatch a failure action when the effect is triggered and the test is not valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateCatBEta').and.returnValue(of(false));
      // ACT
      actions$.next(new testDataActions.ToggleETA(ExaminerActions.physical));
      // ASSERT
      effects.validateCatBTestEta$.subscribe((result) => {
        expect(testReportValidatorProvider.validateCatBEta).toHaveBeenCalled();
        expect(result).toEqual(new testReportActions.ValidateEta(false));
        done();
      });
    });
  });

  describe('calculateTestResult', () => {

    beforeEach(() => {
      store$.dispatch(new journalActions.StartTest(123456));
    });

    it('should dispatch an action containing the correct result for a test', (done) => {
       // ARRANGE
      spyOn(testResultProvider, 'calculateCatBTestResult').and.returnValue(of(ActivityCodes.PASS));
       // ACT
      actions$.next(new testReportActions.CalculateTestResult());
       // ASSERT
      effects.calculateTestResult$.subscribe((result) => {
        expect(testResultProvider.calculateCatBTestResult).toHaveBeenCalled();
        expect(result).toEqual(new testsActions.SetActivityCode(ActivityCodes.PASS));
        done();
      });
    });
  });

  describe('persistTestReport', () => {

    beforeEach(() => {
      store$.dispatch(new journalActions.StartTest(123456));
    });

    it('should dispatch an action requesting the test data to be saved when triggered', (done) => {
      // ACT
      actions$.next(new testDataActions.ToggleETA(ExaminerActions.physical));
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
});
