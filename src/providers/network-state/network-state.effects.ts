import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { UNAUTHENTICATED_MODE, SetUnauthenticatedMode } from './network-state.actions';

@Injectable()
export class NetworkStateEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  unauthenticatedMode$ = this.actions$.pipe(
    ofType(UNAUTHENTICATED_MODE),
    switchMap(
      (action: SetUnauthenticatedMode) => {
        console.log(`unauthenticated mode: ${action.unauthenticated}`);
        return of();
      },
    ),
  );
}
