import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportEffects } from '../test-report.effects';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import * as testDataActions from '../../../modules/tests/test_data/test-data.actions';
import * as journalActions from '../../journal/journal.actions';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { ValidateTestResult } from '../test-report.actions';

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
        Store,
      ],
    });
    testReportValidatorProvider = TestBed.get(TestReportValidatorProvider);
    effects = TestBed.get(TestReportEffects);
    store$ = TestBed.get(Store);
  });

  it('should create the test report effects', () => {
    expect(effects).toBeTruthy();
  });

  describe('validateCatBTest', () => {

    beforeEach(() => {
      store$.dispatch(new journalActions.StartTest(123456));
    });

    it('should dispatch a success action when the effect is triggered and test is valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateCatBTestReport').and.returnValue(true);
      // ACT
      actions$.next(new testDataActions.ToggleEco());
      // ASSERT
      effects.validateCatBTest$.subscribe((result) => {
        expect(testReportValidatorProvider.validateCatBTestReport).toHaveBeenCalled();
        expect(result).toEqual(new ValidateTestResult(true));
        done();
      });
    });

    it('should dispatch a failure action when the effect is triggered and test is not valid', (done) => {
      // ARRANGE
      spyOn(testReportValidatorProvider, 'validateCatBTestReport').and.returnValue(false);
      // ACT
      actions$.next(new testDataActions.ToggleEco());
      // ASSERT
      effects.validateCatBTest$.subscribe((result) => {
        expect(testReportValidatorProvider.validateCatBTestReport).toHaveBeenCalled();
        expect(result).toEqual(new ValidateTestResult(false));
        done();
      });
    });
  });
});
