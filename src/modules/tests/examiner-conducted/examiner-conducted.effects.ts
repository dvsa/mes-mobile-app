import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, withLatestFrom, concatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { StoreModel } from '../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from './../tests.reducer';
import { getCurrentTest } from './../tests.selector';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { SetChangeMarker } from '../change-marker/change-marker.actions';
import { SetExaminerConducted, SET_EXAMINER_CONDUCTED } from './examiner-conducted.actions';

@Injectable()
export class ExaminerConductedEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  setExaminerConductedEffect$ = this.actions$.pipe(
    ofType(SET_EXAMINER_CONDUCTED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
        ),
      ),
    )),
    map(([action, test]: [SetExaminerConducted, StandardCarTestCATBSchema]) =>
      new SetChangeMarker(action.examinerConducted !== test.examinerBooked)),
  );

}
