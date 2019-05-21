import { TestsEffects } from '../tests.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestPersistenceProvider } from '../../../providers/test-persistence/test-persistence';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestPersistenceProviderMock } from '../../../providers/test-persistence/__mocks__/test-persistence.mock';
import * as testsActions from '../tests.actions';
import * as testStatusActions from '../test-status/test-status.actions';
import { TestsModel } from '../tests.model';
import { PopulateApplicationReference } from '../application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../candidate/candidate.actions';
import {
  testReportPracticeModeApplication,
  testReportPracticeModeCandidate,
  testReportPracticeModeSlot,
} from '../__mocks__/tests.mock';
import { initialState, testsReducer } from '../tests.reducer';
import { TestSubmissionProvider } from '../../../providers/test-submission/test-submission';
import { TestSubmissionProviderMock } from '../../../providers/test-submission/__mocks__/test-submission.mock';
import { Store, StoreModule } from '@ngrx/store';
import { NetworkStateProvider } from '../../../providers/network-state/network-state';
import { NetworkStateProviderMock } from '../../../providers/network-state/__mocks__/network-state.mock';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';

describe('Tests Effects', () => {

  let effects: TestsEffects;
  let actions$: any;
  let testPersistenceProviderMock;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        TestsEffects,
        provideMockActions(() => actions$),
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: TestPersistenceProvider, useClass: TestPersistenceProviderMock },
        { provide: TestSubmissionProvider, useClass: TestSubmissionProviderMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        Store,
      ],
    });
    effects = TestBed.get(TestsEffects);
    testPersistenceProviderMock = TestBed.get(TestPersistenceProvider);
  });

  describe('persistTestsEffect', () => {
    it('should respond to a PERSIST_TESTS action and delegate to the persistence provider', (done) => {
      // ARRANGE
      testPersistenceProviderMock.persistAllTests.and.returnValue(Promise.resolve());
      // ACT
      actions$.next(new testsActions.PersistTests());
      // ASSERT
      effects.persistTestsEffect$.subscribe(() => {
        expect(testPersistenceProviderMock.persistAllTests).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('loadPersistedTestsEffect', () => {
    it('should respond to a LOAD_PERSISTED_TESTS action by loading tests and dispatching a success action', (done) => {
      // ARRANGE
      const persistedTests: TestsModel = {
        ...initialState,
        currentTest: {
          ...initialState.currentTest,
          slotId: '123',
        },
      };
      testPersistenceProviderMock.loadPersistedTests.and.returnValue(Promise.resolve(persistedTests));
      // ACT
      actions$.next(new testsActions.LoadPersistedTests());
      // ASSERT
      effects.loadPersistedTestsEffect$.subscribe((emission) => {
        expect(testPersistenceProviderMock.loadPersistedTests).toHaveBeenCalled();
        expect(emission).toEqual(new testsActions.LoadPersistedTestsSuccess(persistedTests));
        done();
      });
    });
  });

  describe('startPracticeTestEffect', () => {
    it('should dispatch the PopulateApplicationReference and PopulateCandidateDetails action', (done) => {
      // ACT
      actions$.next(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      // ASSERT
      effects.startPracticeTestEffect$.subscribe((result) => {
        if (result instanceof PopulateApplicationReference)  {
          expect(result).toEqual(new PopulateApplicationReference(testReportPracticeModeApplication));
        }
        if (result instanceof PopulateCandidateDetails) {
          expect(result).toEqual(new PopulateCandidateDetails(testReportPracticeModeCandidate));
        }
        done();
      });
    });
  });

  describe('sendTestSuccessEffect', () => {
    it('should dispatch the TestStatusSubmitted action', (done) => {
      const currentTestSlotId = '12345';
      // ACT
      actions$.next(new testsActions.SendTestSuccess(currentTestSlotId));
      // ASSERT
      effects.sendTestSuccessEffect$.subscribe((result) => {
        if (result instanceof testStatusActions.SetTestStatusSubmitted)  {
          expect(result).toEqual(new testStatusActions.SetTestStatusSubmitted(currentTestSlotId));
        }
        if (result instanceof testsActions.PersistTests) {
          expect(result).toEqual(new testsActions.PersistTests());
        }
        done();
      });
    });
  });

});
