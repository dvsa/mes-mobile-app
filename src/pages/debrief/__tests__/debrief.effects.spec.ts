import { DebriefEffects } from '../debrief.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as debriefActions from '../debrief.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../../modules/tests/tests.actions';

describe('Debrief Effects', () => {

  let effects: DebriefEffects;
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
        DebriefEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(DebriefEffects);
  });

  describe('endDebriefEffect', () => {

    it('should return SET_STATUS_DECIDED & PERSIST_TESTS actions', (done) => {
      actions$.next(new debriefActions.EndDebrief());

      effects.endDebriefEffect$.subscribe((result) => {
        if (result instanceof testStatusActions.SetTestStatusDecided) {
          expect(result).toEqual(new testStatusActions.SetTestStatusDecided(currentSlotId));
        }
        if (result instanceof testsActions.PersistTests) {
          expect(result).toEqual(new testsActions.PersistTests());
        }
        done();
      });
    });

  });

});
