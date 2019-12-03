import { RekeyReasonEffects } from '../rekey-reason.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testActions  from '../../../modules/tests/tests.actions';
import * as rekeyReasonActions from '../rekey-reason.actions';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { journalReducer } from '../../../modules/journal/journal.reducer';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { rekeySearchReducer } from '../../rekey-search/rekey-search.reducer';
import { FindUserProvider } from '../../../providers/find-user/find-user';
import { FindUserProviderMock } from '../../../providers/find-user/__mocks__/find-user.mock';
import { SetExaminerBooked } from '../../../modules/tests/examiner-booked/examiner-booked.actions';
import { SetExaminerConducted } from '../../../modules/tests/examiner-conducted/examiner-conducted.actions';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { defer } from 'rxjs/observable/defer';
import { TestCategory } from '../../../shared/models/test-category';
import { configureTestSuite } from 'ng-bullet';

describe('Rekey Reason Effects', () => {
  let effects: RekeyReasonEffects;
  let actions$: any;
  let findUserProvider: FindUserProvider;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
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
        provideMockActions(() => actions$),
        { provide: FindUserProvider, useClass: FindUserProviderMock },
        Store,
      ],
    });
  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(RekeyReasonEffects);
    store$ = TestBed.get(Store);
    findUserProvider = TestBed.get(FindUserProvider);
  });

  describe('rekeyReasonValidateTransferEffect', () => {
    describe('not a transfer', () => {
      it('should send the current test and not call the find user provider', (done) => {
        // ARRANGE
        store$.dispatch(new testActions.StartTest(12345, TestCategory.B));
        store$.dispatch(new SetExaminerBooked(333));
        store$.dispatch(new SetExaminerConducted(333));
        spyOn(findUserProvider, 'userExists');
        // ACT
        actions$.next(new rekeyReasonActions.ValidateTransferRekey());
        // ASSERT
        effects.rekeyReasonValidateTransferEffect$.subscribe((res) => {
          expect(res).toEqual(new testActions.SendCurrentTest());
          expect(findUserProvider.userExists).not.toHaveBeenCalled();
          done();
        });
      });
    });
    describe('transfer', () => {
      it('should send the current test when the staff number is valid', (done) => {
        // ARRANGE
        store$.dispatch(new testActions.StartTest(12345, TestCategory.B));
        store$.dispatch(new SetExaminerBooked(333));
        store$.dispatch(new SetExaminerConducted(789));
        spyOn(findUserProvider, 'userExists').and.returnValue(asyncSuccess(new HttpResponse({
          status: 200,
          statusText: 'OK',
        })));
        // ACT
        actions$.next(new rekeyReasonActions.ValidateTransferRekey());
        // ASSERT
        effects.rekeyReasonValidateTransferEffect$.subscribe((res) => {
          expect(res).toEqual(new testActions.SendCurrentTest());
          expect(findUserProvider.userExists).toHaveBeenCalled();
          done();
        });
      });
      it('should return a failure action with a true payload when the staff number is not valid', (done) => {
        // ARRANGE
        store$.dispatch(new testActions.StartTest(12345, TestCategory.B));
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
        effects.rekeyReasonValidateTransferEffect$.subscribe((res) => {
          expect(res).toEqual(new rekeyReasonActions.ValidateTransferRekeyFailed(true));
          expect(findUserProvider.userExists).toHaveBeenCalled();
          done();
        });
      });
      it('should return a failure action with a false payload when the find user provider errors', (done) => {
        // ARRANGE
        spyOn(findUserProvider, 'userExists').and.returnValue(asyncError(new HttpErrorResponse({
          error: 'Error message',
          status: 401,
          statusText: 'OK',
        })));
        store$.dispatch(new testActions.StartTest(12345, TestCategory.B));
        store$.dispatch(new SetExaminerBooked(333));
        store$.dispatch(new SetExaminerConducted(789));
        // ACT
        actions$.next(new rekeyReasonActions.ValidateTransferRekey());
        // ASSERT
        effects.rekeyReasonValidateTransferEffect$.subscribe((res) => {
          expect(res).toEqual(new rekeyReasonActions.ValidateTransferRekeyFailed(false));
          expect(findUserProvider.userExists).toHaveBeenCalled();
          done();
        });
      });
    });
  });

});

function asyncSuccess(successObject: any) {
  return defer(() => Promise.resolve(successObject));
}

function asyncError(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
