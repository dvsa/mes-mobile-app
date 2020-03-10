import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, withLatestFrom, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StoreModel } from '../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from './../tests.reducer';
import { getCurrentTest } from './../tests.selector';
import { SetChangeMarker } from '../change-marker/change-marker.actions';
import { SetExaminerBooked, SET_EXAMINER_BOOKED } from './examiner-booked.actions';
import { TestResultSchemasUnion } from '@dvsa/mes-test-schema/categories';

@Injectable()
export class ExaminerBookedEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  setExaminerBookedEffect$ = this.actions$.pipe(
    ofType(SET_EXAMINER_BOOKED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
        ),
      ),
    )),
    map(([action, test]: [SetExaminerBooked, TestResultSchemasUnion]) =>
      new SetChangeMarker(action.examinerBooked !== test.examinerConducted)),
  );

}
