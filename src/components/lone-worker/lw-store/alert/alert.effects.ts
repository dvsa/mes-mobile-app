import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { AlertProvider } from '../../lw-providers/alert.provider';
import * as alertActions from './alert.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class AlertEffects {
  constructor(
        private actions$: Actions,
        private alertProvider: AlertProvider,
  ) {}

  @Effect()
  sendRedAlert$ = this.actions$.pipe(
    ofType<alertActions.SendRedAlert>(alertActions.SEND_RED_ALERT),
    switchMap((action) => {
      return this.alertProvider.triggerAlert(action.incident).pipe(
        map(receipt => new alertActions.RedAlertSent(receipt)),
        catchError((err: HttpErrorResponse) => of(new alertActions.AlertSendFailure(err))),
      );
    }),
  );

  @Effect()
  sendAmberAlert$ = this.actions$.pipe(
    ofType<alertActions.SendAmberAlert>(alertActions.SEND_AMBER_ALERT),
    switchMap((action) => {
      return this.alertProvider.triggerAlert(action.incident).pipe(
        map(receipt => new alertActions.AmberAlertSent(receipt)),
        catchError((err: HttpErrorResponse) => of(new alertActions.AlertSendFailure(err))),
      );
    }),
  );
}
