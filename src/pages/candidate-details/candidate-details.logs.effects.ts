import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as candidateDetailsActions from './candidate-details.actions';
import * as logsActions from '../../modules/logs/logs.actions';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Log, LogType } from '../../shared/models/log.model';

@Injectable()
export class CandidateDetailsLogsEffects {

  constructor(
    private actions$: Actions,
    private authenticationProvider: AuthenticationProvider) {}

  @Effect()
  candidateDetailsViewDidEnterEffect$ = this.actions$.pipe(
    ofType(candidateDetailsActions.CANDIDATE_DETAILS_VIEW_DID_ENTER),
    switchMap((action: candidateDetailsActions.CandidateDetailsViewDidEnter) => {
      const log: Log = this.createLog(LogType.INFO, action.type);
      return of(new logsActions.SaveLog(log));
    }),
  );

  private createLog(logType: LogType, actionType: string): Log {
    return {
      type: logType,
      message: `DE with id: ${this.authenticationProvider.getEmployeeId()} - ${actionType}`,
      timestamp: Date.now(),
    };
  }
}
