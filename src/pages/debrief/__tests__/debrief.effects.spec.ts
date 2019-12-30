import { DebriefEffects } from '../debrief.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as debriefActions from '../debrief.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as activityCodeActions from '../../../modules/tests/activity-code/activity-code.actions';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('Debrief Effects', () => {

  let effects: DebriefEffects;
  let actions$: any;
  let store$: Store<StoreModel>;

  const currentSlotId = '1234';

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        DebriefEffects,
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(DebriefEffects);
    store$ = TestBed.get(Store);
  });

  describe('endDebriefEffect', () => {

    it('should return SET_TEST_STATUS_DECIDED & PERSIST_TESTS actions when passed test', (done) => {
      // Set activity code as passed
      store$.dispatch(new testsActions.StartTest(1234, TestCategory.B));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));

      actions$.next(new debriefActions.EndDebrief());

      effects.endDebriefEffect$.subscribe((result) => {
        if (result instanceof testStatusActions.SetTestStatusDecided ||
          result instanceof testStatusActions.SetTestStatusWriteUp) {
          expect(result).toEqual(new testStatusActions.SetTestStatusDecided(currentSlotId));
        }
        if (result instanceof testsActions.PersistTests) {
          expect(result).toEqual(new testsActions.PersistTests());
        }
        done();
      });
    });

    it('should return SET_TEST_STATUS_DECIDED & PERSIST_TESTS actions when failed test', (done) => {
      // Set activity code as failed
      store$.dispatch(new testsActions.StartTest(1234, TestCategory.B));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));

      actions$.next(new debriefActions.EndDebrief());

      effects.endDebriefEffect$.subscribe((result) => {
        if (result instanceof testStatusActions.SetTestStatusWriteUp ||
          result instanceof testStatusActions.SetTestStatusDecided) {
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
