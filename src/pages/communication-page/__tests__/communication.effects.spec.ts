import { CommunicationEffects } from '../communication.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as communicationActions from '../communication.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { configureTestSuite } from 'ng-bullet'

describe('Communication Effects', () => {

  let effects: CommunicationEffects;
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
        CommunicationEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
  })

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(CommunicationEffects);
  });

  describe('submitCommunicationInfoEffect', () => {

    it('should return SET_STATUS_DECIDED & PERSIST_TESTS actions', (done) => {
      actions$.next(new communicationActions.CommunicationSubmitInfo());

      effects.communicationSubmitInfoEffect$.subscribe((result) => {
        if (result instanceof testStatusActions.SetTestStatusStarted) {
          expect(result).toEqual(new testStatusActions.SetTestStatusStarted(currentSlotId));
        }
        if (result instanceof testsActions.PersistTests) {
          expect(result).toEqual(new testsActions.PersistTests());
        }
        done();
      });
    });

  });

});
