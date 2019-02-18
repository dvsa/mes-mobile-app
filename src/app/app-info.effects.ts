import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as appInfoActions from './app-info.actions';

@Injectable()
export class AppInfoEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  loadAppInfo$ = this.actions$.pipe(
    ofType(appInfoActions.LOAD_APP_INFO),
    map(() => {
      console.log('Load App Info');
      return of();
    }),
  );
}
