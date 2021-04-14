import { ExaminerBookedEffects } from '../examiner-booked.effects';
import { SetExaminerBooked } from '../examiner-booked.actions';
import { ReplaySubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { testsReducer } from '../../tests.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { SetChangeMarker } from '../../change-marker/change-marker.actions';
import { StartTest } from '../../tests.actions';
import { SetExaminerConducted } from '../../examiner-conducted/examiner-conducted.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Examiner Booked Effects', function () {
    var effects;
    var actions$;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                ExaminerBookedEffects,
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(ExaminerBookedEffects);
        store$ = TestBed.get(Store);
    });
    describe('setExaminerBookedEffect', function () {
        it('should set the change marker to true when the examiner booked is different to the conducted', function (done) {
            // ARRANGE
            store$.dispatch(new StartTest(12345, "B" /* B */));
            store$.dispatch(new SetExaminerConducted(123456));
            // ACT
            actions$.next(new SetExaminerBooked(100001));
            // ASSERT
            effects.setExaminerBookedEffect$.subscribe(function (result) {
                expect(result).toEqual(new SetChangeMarker(true));
                done();
            });
        });
        it('should set the change marker to false when the examiner booked is the same as the conducted', function (done) {
            // ARRANGE
            store$.dispatch(new StartTest(12345, "B" /* B */));
            store$.dispatch(new SetExaminerConducted(123456));
            // ACT
            actions$.next(new SetExaminerBooked(123456));
            // ASSERT
            effects.setExaminerBookedEffect$.subscribe(function (result) {
                expect(result).toEqual(new SetChangeMarker(false));
                done();
            });
        });
    });
});
//# sourceMappingURL=examiner-booked.effects.spec.js.map