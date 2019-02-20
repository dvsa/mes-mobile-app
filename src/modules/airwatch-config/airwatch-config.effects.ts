import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as airwatchConfigActions from './airwatch-config.actions';
import { AirwatchConfigProvider } from '../../providers/airwatch-config/airwatch-config';
import { AirwatchConfigModel } from '../../providers/airwatch-config/airwatch-config.model';

@Injectable()
export class AirwatchConfigEffects {
  constructor(
    private actions$: Actions,
    private airwatchConfigProvider: AirwatchConfigProvider,
  ) {}

  @Effect()
  loadAirwatchConfig$ = this.actions$.pipe(
    ofType(airwatchConfigActions.LOAD_AIRWATCH_CONFIG),
    switchMap(() => {
      return this.airwatchConfigProvider
        .getAirwatchConfig()
        .pipe(
          map((airwatchConfig: AirwatchConfigModel) => {
            return new airwatchConfigActions.LoadAirwatchConfigSuccess(airwatchConfig);
          }),
          catchError((err) => {
            return of(new airwatchConfigActions.LoadAirwatchConfigFailure(err));
          }),
        );
    }),
  );
}
