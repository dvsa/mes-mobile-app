import { DebriefEffects } from '../debrief.effects';
import { TestBed, async } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as debriefActions from '../debrief.actions';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as activityCodeActions from '../../../modules/tests/activity-code/activity-code.actions';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { configureTestSuite } from 'ng-bullet';
describe('Debrief Effects', function () {
    var effects;
    var actions$;
    var store$;
    var currentSlotId = '1234';
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                DebriefEffects,
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(async(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(DebriefEffects);
        store$ = TestBed.get(Store);
    }));
    describe('endDebriefEffect', function () {
        it('should return SET_TEST_STATUS_DECIDED & PERSIST_TESTS actions when passed test', function (done) {
            // Set activity code as passed
            store$.dispatch(new testsActions.StartTest(1234, "B" /* B */));
            store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
            actions$.next(new debriefActions.EndDebrief());
            effects.endDebriefEffect$.subscribe(function (result) {
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
        it('should return SET_TEST_STATUS_DECIDED & PERSIST_TESTS actions when failed test', function (done) {
            // Set activity code as failed
            store$.dispatch(new testsActions.StartTest(1234, "B" /* B */));
            store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
            actions$.next(new debriefActions.EndDebrief());
            effects.endDebriefEffect$.subscribe(function (result) {
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
//# sourceMappingURL=debrief.effects.spec.js.map