import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as appActions from './app.actions';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { interval } from 'rxjs/observable/interval';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private authenticationProvider: AuthenticationProvider,
  ) {
  }

  @Effect({ dispatch: false })
  refreshToken$ = this.actions$.pipe(
    ofType(appActions.REFRESH_TOKEN),
    switchMap(() => {
      return interval(60 * 1000)
        .pipe(
          tap(() => {
            this.authenticationProvider.login()
          }),
        );
    }),
  );
}
