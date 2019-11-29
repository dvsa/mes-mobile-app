import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportEffects } from '../test-report.effects';
import * as etaActions from '../../../modules/tests/test-data/common/eta/eta.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as testReportActions from '../test-report.actions';
import * as activityCodeActions from '../../../modules/tests/activity-code/activity-code.actions';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { of } from 'rxjs/observable/of';
import { ExaminerActions } from '../../../modules/tests/test-data/test-data.constants';
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
        TestResultProvider,
        FaultCountProvider,
        Store,
      ],
    });
    testResultProvider = TestBed.get(TestResultProvider);
    effects = TestBed.get(TestReportEffects);
    store$ = TestBed.get(Store);
  });

  describe('calculateTestResult', () => {

    beforeEach(() => {
      store$.dispatch(new testsActions.StartTest(123456, TestCategory.B));
      store$.dispatch(new PopulateTestCategory(TestCategory.B));
    });

    it('should dispatch an action containing the correct result for a test', (done) => {
       // ARRANGE
      spyOn(testResultProvider, 'calculateTestResult').and.returnValue(of(ActivityCodes.PASS));
       // ACT
      actions$.next(new testReportActions.CalculateTestResult());
       // ASSERT
      effects.calculateTestResult$.subscribe((result) => {
        expect(testResultProvider.calculateTestResult).toHaveBeenCalled();
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
