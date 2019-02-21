import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as appInfoActions from './app-info.actions';
import { AppInfoProvider } from '../../providers/app-info/app-info';

@Injectable()
export class AppInfoEffects {
  constructor(
    private actions$: Actions,
    private appInfoProvider: AppInfoProvider,
  ) {}

  @Effect()
  loadAppInfo$ = this.actions$.pipe(
    ofType(appInfoActions.LOAD_APP_INFO),
    switchMap(() => {
      return this.appInfoProvider
        .getVersionNumber()
        .pipe(
          map((versionNumber: string) => new appInfoActions.LoadAppInfoSuccess(versionNumber)),
          catchError(err => of(new appInfoActions.LoadAppInfoFailure(err))),
        );
    }),
  );
}
