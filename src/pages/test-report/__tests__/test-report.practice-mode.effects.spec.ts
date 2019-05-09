import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { StoreModule, Store } from '@ngrx/store';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import * as journalActions from '../../journal/journal.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { TestResultProvider } from '../../../providers/test-result/test-result';
import { TestReportPracticeModeEffects, application, candidate } from '../test-report.practice-mode.effects';
import { PopulateApplicationReference }
  from '../../../modules/tests/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../../../modules/tests/candidate/candidate.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

fdescribe('Test Report Practice Mode Effects', () => {

  let effects: TestReportPracticeModeEffects;
  let actions$: any;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        TestReportPracticeModeEffects,
        provideMockActions(() => actions$),
        TestReportValidatorProvider,
        TestResultProvider,
        Store,
      ],
    });
    effects = TestBed.get(TestReportPracticeModeEffects);
  });

  it('should create the test report practice mode effects', () => {
    expect(effects).toBeTruthy();
  });

  describe('startPracticeTestEffect', () => {

    it('should dispatch the PopulateApplicationReference and PopulateCandidateDetails action', (done) => {
      // ACT
      actions$.next(new journalActions.StartPracticeTest(1));
      // ASSERT
      effects.startPracticeTestEffect$.subscribe((result) => {
        if (result instanceof PopulateApplicationReference)  {
          expect(result).toEqual(new PopulateApplicationReference(application));
        }
        if (result instanceof PopulateCandidateDetails) {
          expect(result).toEqual(new PopulateCandidateDetails(candidate));
        }
        done();
      });
    });

  });

});
