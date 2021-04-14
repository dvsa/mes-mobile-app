import { RekeyReasonEffects } from '../rekey-reason.effects';
import { ReplaySubject, defer } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testActions from '../../../modules/tests/tests.actions';
import * as rekeyReasonActions from '../rekey-reason.actions';
import { StoreModule, Store } from '@ngrx/store';
import { journalReducer } from '../../../modules/journal/journal.reducer';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { rekeySearchReducer } from '../../rekey-search/rekey-search.reducer';
import { FindUserProvider } from '../../../providers/find-user/find-user';
import { FindUserProviderMock } from '../../../providers/find-user/__mocks__/find-user.mock';
import { SetExaminerBooked } from '../../../modules/tests/examiner-booked/examiner-booked.actions';
import { SetExaminerConducted } from '../../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { configureTestSuite } from 'ng-bullet';
describe('Rekey Reason Effects', function () {
    var effects;
    var actions$;
    var findUserProvider;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    journal: journalReducer,
                    tests: testsReducer,
                    rekeySearch: rekeySearchReducer,
                }),
            ],
            providers: [
                RekeyReasonEffects,
                provideMockActions(function () { return actions$; }),
                { provide: FindUserProvider, useClass: FindUserProviderMock },
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(RekeyReasonEffects);
        store$ = TestBed.get(Store);
        findUserProvider = TestBed.get(FindUserProvider);
    });
    describe('rekeyReasonValidateTransferEffect', function () {
        describe('not a transfer', function () {
            it('should send the current test and not call the find user provider', function (done) {
                // ARRANGE
                store$.dispatch(new testActions.StartTest(12345, "B" /* B */));
                store$.dispatch(new SetExaminerBooked(333));
                store$.dispatch(new SetExaminerConducted(333));
                spyOn(findUserProvider, 'userExists');
                // ACT
                actions$.next(new rekeyReasonActions.ValidateTransferRekey());
                // ASSERT
                effects.rekeyReasonValidateTransferEffect$.subscribe(function (res) {
                    expect(res).toEqual(new testActions.SendCurrentTest());
                    expect(findUserProvider.userExists).not.toHaveBeenCalled();
                    done();
                });
            });
        });
        describe('transfer', function () {
            it('should send the current test when the staff number is valid', function (done) {
                // ARRANGE
                store$.dispatch(new testActions.StartTest(12345, "B" /* B */));
                store$.dispatch(new SetExaminerBooked(333));
                store$.dispatch(new SetExaminerConducted(789));
                spyOn(findUserProvider, 'userExists').and.returnValue(asyncSuccess(new HttpResponse({
                    status: 200,
                    statusText: 'OK',
                })));
                // ACT
                actions$.next(new rekeyReasonActions.ValidateTransferRekey());
                // ASSERT
                effects.rekeyReasonValidateTransferEffect$.subscribe(function (res) {
                    expect(res).toEqual(new testActions.SendCurrentTest());
                    expect(findUserProvider.userExists).toHaveBeenCalled();
                    done();
                });
            });
            it('should return a failure action with a true payload when the staff number is not valid', function (done) {
                // ARRANGE
                store$.dispatch(new testActions.StartTest(12345, "B" /* B */));
                store$.dispatch(new SetExaminerBooked(333));
                store$.dispatch(new SetExaminerConducted(57463524));
                spyOn(findUserProvider, 'userExists').and.returnValue(asyncError(new HttpErrorResponse({
                    error: 'Error message',
                    status: 404,
                    statusText: 'Not Found',
                })));
                // ACT
                actions$.next(new rekeyReasonActions.ValidateTransferRekey());
                // ASSERT
                effects.rekeyReasonValidateTransferEffect$.subscribe(function (res) {
                    expect(res).toEqual(new rekeyReasonActions.ValidateTransferRekeyFailed(true));
                    expect(findUserProvider.userExists).toHaveBeenCalled();
                    done();
                });
            });
            it('should return a failure action with a false payload when the find user provider errors', function (done) {
                // ARRANGE
                spyOn(findUserProvider, 'userExists').and.returnValue(asyncError(new HttpErrorResponse({
                    error: 'Error message',
                    status: 401,
                    statusText: 'OK',
                })));
                store$.dispatch(new testActions.StartTest(12345, "B" /* B */));
                store$.dispatch(new SetExaminerBooked(333));
                store$.dispatch(new SetExaminerConducted(789));
                // ACT
                actions$.next(new rekeyReasonActions.ValidateTransferRekey());
                // ASSERT
                effects.rekeyReasonValidateTransferEffect$.subscribe(function (res) {
                    expect(res).toEqual(new rekeyReasonActions.ValidateTransferRekeyFailed(false));
                    expect(findUserProvider.userExists).toHaveBeenCalled();
                    done();
                });
            });
        });
    });
});
function asyncSuccess(successObject) {
    return defer(function () { return Promise.resolve(successObject); });
}
function asyncError(errorObject) {
    return defer(function () { return Promise.reject(errorObject); });
}
//# sourceMappingURL=rekey-reason.effects.spec.js.map