import { HealthDeclarationEffects } from '../health-declaration.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as healthDeclarationActions from '../health-declaration.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { configureTestSuite } from 'ng-bullet'

describe('Health Declaration Effects', () => {

  let effects: HealthDeclarationEffects;
  let actions$: any;

  const currentSlotId = '1234';

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: currentSlotId,
            },
            testStatus: {},
            startedTests: {},
          }),
        }),
      ],
      providers: [
        HealthDeclarationEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
  })

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(HealthDeclarationEffects);
  });

  describe('endHealthDeclarationEffect', () => {

    it('should return SET_TEST_STATUS_WRITE_UP & PERSIST_TESTS actions', (done) => {
      actions$.next(new healthDeclarationActions.ContinueFromDeclaration());

      effects.endHealthDeclarationEffect$.subscribe((result) => {
        if (result instanceof testStatusActions.SetTestStatusWriteUp) {
          expect(result).toEqual(new testStatusActions.SetTestStatusWriteUp(currentSlotId));
        }
        if (result instanceof testsActions.PersistTests) {
          expect(result).toEqual(new testsActions.PersistTests());
          done();
        }
      });
    });

  });

});
