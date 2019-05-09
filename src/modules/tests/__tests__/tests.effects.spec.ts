import { TestsEffects } from '../tests.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestPersistenceProvider } from '../../../providers/test-persistence/test-persistence';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestPersistenceProviderMock } from '../../../providers/test-persistence/__mocks__/test-persistence.mock';
import * as testsActions from '../tests.actions';
import { TestsModel } from '../tests.model';
import { PopulateApplicationReference } from '../application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../candidate/candidate.actions';
import { application, candidate } from '../__mocks__/tests.mock';

describe('Tests Effects', () => {

  let effects: TestsEffects;
  let actions$: any;
  let testPersistenceProviderMock;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      providers: [
        TestsEffects,
        provideMockActions(() => actions$),
        { provide: TestPersistenceProvider, useClass: TestPersistenceProviderMock },
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
        currentTest: { slotId: '123' },
        startedTests: {},
        testLifecycles: {},
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
      actions$.next(new testsActions.StartPracticeTest(1));
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
