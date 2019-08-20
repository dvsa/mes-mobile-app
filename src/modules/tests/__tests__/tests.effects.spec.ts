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
  testApplicationMock,
  candidateMock,
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
import { StartTest } from '../../../pages/journal/journal.actions';
import { StoreModel } from '../../../shared/models/store.model';

describe('Tests Effects', () => {

  let effects: TestsEffects;
  let actions$: any;
  let testPersistenceProviderMock;
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
    store$ = TestBed.get(Store);
  });

  describe('persistTestsEffect', () => {
    it('should respond to a PERSIST_TESTS action and delegate to the persistence provider', (done) => {
      // ARRANGE
      store$.dispatch(new StartTest(12345));
      testPersistenceProviderMock.persistTests.and.returnValue(Promise.resolve());
      // ACT
      actions$.next(new testsActions.PersistTests());
      // ASSERT
      effects.persistTestsEffect$.subscribe(() => {
        expect(testPersistenceProviderMock.persistTests).toHaveBeenCalled();
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
          expect(result).toEqual(new PopulateApplicationReference(testApplicationMock));
        }
        if (result instanceof PopulateCandidateDetails) {
          expect(result).toEqual(new PopulateCandidateDetails(candidateMock));
        }
        done();
      });
    });
  });

  describe('sendCompletedTestsEffect', () => {
    it('should dispatch use the order of the responses to coordinate subsequent dispatching of actions', (done) => {
      // ARRANGE
      // Adds three tests as 'Completed' for the sendCompletedTestsEffect to consume
      // The http responses are mocked in test-submission.mock.ts
      const currentTestSlotId = '12345'; // Mocked as a 201 http response
      const currentTestSlotId1 = '123456'; // Mocked as a 201 http response
      const currentTestSlotId2 = '1234567'; // Mocked as a 500 http error response
      store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
      store$.dispatch(new testStatusActions.SetTestStatusCompleted(testReportPracticeModeSlot.slotDetail.slotId));
      store$.dispatch(new StartTest(Number(currentTestSlotId)));
      store$.dispatch(new testStatusActions.SetTestStatusCompleted(currentTestSlotId));
      store$.dispatch(new StartTest(Number(currentTestSlotId1)));
      store$.dispatch(new testStatusActions.SetTestStatusCompleted(currentTestSlotId1));
      store$.dispatch(new StartTest(Number(currentTestSlotId2)));
      store$.dispatch(new testStatusActions.SetTestStatusCompleted(currentTestSlotId2));
      // ACT
      actions$.next(new testsActions.SendCompletedTests());
      // ASSERT
      effects.sendCompletedTestsEffect$.subscribe((result) => {
        if (result instanceof testsActions.SendCompletedTestSuccess) {
          if (result.completedTestId === currentTestSlotId) {
            expect(result).toEqual(new testsActions.SendCompletedTestSuccess(currentTestSlotId));
          }
          if (result.completedTestId === currentTestSlotId1) {
            expect(result).toEqual(new testsActions.SendCompletedTestSuccess(currentTestSlotId1));
          }
          if (result.completedTestId === currentTestSlotId2) {
            expect(result).toEqual(new testsActions.SendCompletedTestsFailure());
          }
          if (result.completedTestId === testReportPracticeModeSlot.slotDetail.slotId) {
            fail('Practice test should not be submitted');
          }
        }
        done();
      });
    });
  });

  describe('sendCurrentTestSuccessEffect', () => {
    it('should dispatch the TestStatusSubmitted action', (done) => {
      const currentTestSlotId = '12345';
      // ACT
      actions$.next(new testsActions.SendCurrentTestSuccess(currentTestSlotId));
      // ASSERT
      effects.sendCurrentTestSuccessEffect$.subscribe((result) => {
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
