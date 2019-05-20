import { WaitingRoomEffects } from '../waiting-room.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as waitingRoomActions from '../waiting-room.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../../modules/tests/tests.actions';

describe('Waiting Room Effects', () => {

  let effects: WaitingRoomEffects;
  let actions$: any;

  const currentSlotId = '1234';

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
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
        WaitingRoomEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(WaitingRoomEffects);
  });

  describe('submitWaitingRoomInfoEffect', () => {

    it('should return SET_STATUS_DECIDED & PERSIST_TESTS actions', (done) => {
      actions$.next(new waitingRoomActions.SubmitWaitingRoomInfo());

      effects.submitWaitingRoomInfoEffect$.subscribe((result) => {
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
