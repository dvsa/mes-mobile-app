import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { AlertProvider } from '../../providers/alert.provider';
import * as alertActions from './amber-alert.actions';
import { switchMap, map, catchError, withLatestFrom, filter, takeUntil, mapTo, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, interval } from 'rxjs';
import { AmberAlertProvider } from '../../providers/amber-alert.provider';
import { Store, select } from '@ngrx/store';
import { getAmberAlertState } from './amber-alert.reducer';
import { getAmberIncidents } from './amber-alert.selector';
import { ReceivedIncident } from './amber-alert.model';
import { LoneWorkerConfig, loneWorkerConfigService } from '../../lone-worker-config.service';
import { StoreModel } from '../store.model';
import {
  NetworkStateProvider,
  ConnectionStatus,
} from '../../../../providers/network-state/network-state';

@Injectable()
export class AmberAlertEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
    private alertProvider: AlertProvider,
    /**
     * The lone worker NPM module has its own network state provider
     * but for the porpose of this ionic 3 integration it didn't seem necessary to
     * duplicate it here
     */
    private networkStateProvider: NetworkStateProvider,
    private amberAlertProvider: AmberAlertProvider,
    @Inject(loneWorkerConfigService) private configuration: LoneWorkerConfig,
  ) {

  }
  @Effect()
  subscribeToAmberAlerts$ = this.actions$.pipe(
    ofType<alertActions.SubscribeToAmberAlerts>(alertActions.SUBSCRIBE_TO_AMBER_ALERTS),
    switchMap((action) => {
      const pollTimer$ = interval(this.configuration.amberPollTime ? this.configuration.amberPollTime : 30000);

      const pollsWhileOnlineAndModalClosed$ = pollTimer$
        .pipe(
          tap(t => console.log(`poll tapped ${t}`)),
          withLatestFrom(
            this.networkStateProvider.onNetworkChange(),
            this.store$.pipe(select(getAmberAlertState)),
          ),
          filter(([, connectionStatus, state]) => {
            return connectionStatus === ConnectionStatus.ONLINE && !state.modalOpen;
          }),
        );

      return pollsWhileOnlineAndModalClosed$
        .pipe(
          takeUntil(this.actions$.pipe(ofType(alertActions.UNSUBSCRIBE_FROM_AMBER_ALERTS))),
          mapTo(new alertActions.FetchAmberAlerts(action.testCentreId)),
        );
    }),
  );

  @Effect()
  fetchAmberAlerts$ = this.actions$.pipe(
    ofType<alertActions.FetchAmberAlerts | alertActions.SubscribeToAmberAlerts>(
      alertActions.FETCH_AMBER_ALERTS,
      alertActions.SUBSCRIBE_TO_AMBER_ALERTS,
    ),
    switchMap((action) => {
      return of(null).pipe(
        withLatestFrom(
          this.store$.pipe(
            select(getAmberIncidents),
          ),
        ),
        switchMap(([, recievedIncidents]) => {
          return this.alertProvider.fetchAmberAlerts(action.testCentreId).pipe(
            map((newIncidents) => {
              const activeIncidents: ReceivedIncident[] = newIncidents.map((i) => {
                if (recievedIncidents.some(ri => ri.id === i.id)) {
                  return recievedIncidents.filter(ri => ri.id === i.id)[0];
                }
                return {
                  ...i,
                  viewed: false,
                  dismissed: false,
                };
              });
              return new alertActions.AmberAlertResultRecieved(activeIncidents);
            }),
            catchError((err: HttpErrorResponse) => of(new alertActions.FetchAmberAlertsFailure(err))),
          );
        }),
      );
    }));

  @Effect()
    viewIncidentRequested$ = this.actions$.pipe(
      ofType<alertActions.ViewIncidentRequested>(alertActions.VIEW_INCIDENT_REQUESTED),
      switchMap(() => {
        return of(null).pipe(
          withLatestFrom(
            this.store$.pipe(
              select(getAmberIncidents),
            ),
          ),
          switchMap(([, recievedIncidents]) => {
            const incidentToView = recievedIncidents.filter(i => !i.viewed)[0] ||
              recievedIncidents.filter(i => !i.dismissed)[0];
            return of(this.amberAlertProvider.displayIncident(incidentToView)).pipe(
              map(() => {
                return new alertActions.AmberIncidentViewed(incidentToView);
              }),
            );
          }));
      }),
    );

  @Effect()
    incidentModalClosed$ = this.actions$.pipe(
      ofType<alertActions.AmberIncidentViewClosed>(alertActions.AMBER_INCIDENT_VIEW_CLOSED),
      switchMap(() => {
        return of(null).pipe(
          withLatestFrom(
            this.store$.pipe(
              select(getAmberAlertState),
            ),
          ),
          switchMap(([, state]) => {
            return of(new alertActions.FetchAmberAlerts(state.testCentreId));
          }));
      }),
    );
}
