import { TestStatusEffects } from '../test-status.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestPersistenceProvider } from '../../../../providers/test-persistence/test-persistence';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestPersistenceProviderMock } from '../../../../providers/test-persistence/__mocks__/test-persistence.mock';
import * as testStatusActions from '../test-status.actions';

describe('Test Status Effects', () => {

  let effects: TestStatusEffects;
  let actions$: any;
  let testPersistenceProviderMock;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      providers: [
        TestStatusEffects,
        provideMockActions(() => actions$),
        { provide: TestPersistenceProvider, useClass: TestPersistenceProviderMock },
      ],
    });
    effects = TestBed.get(TestStatusEffects);
    testPersistenceProviderMock = TestBed.get(TestPersistenceProvider);
  });

  describe('testDecidedEffect', () => {
    it('should respond to a TEST_STATUS_DECIDED action when the persistence provider resolves', (done) => {
      // ARRANGE
      testPersistenceProviderMock.persistAllTests.and.returnValue(Promise.resolve());
      // ACT
      actions$.next(new testStatusActions.TestStatusDecided());
      // ASSERT
      effects.testDecidedEffect$.subscribe(() => {
        expect(testPersistenceProviderMock.persistAllTests).toHaveBeenCalled();
        done();
      });
    });
  });

});
