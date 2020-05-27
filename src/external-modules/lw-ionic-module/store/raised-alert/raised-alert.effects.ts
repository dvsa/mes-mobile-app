import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { AlertProvider } from '../../providers/alert.provider';
import * as alertActions from './raised-alert.actions';
import { switchMap, map, catchError, filter, takeUntil, concatMap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, interval, timer, Observable, defer, EMPTY } from 'rxjs';
import { Severity, Location } from '@dvsa/lw-incident-model';

import { NetworkStateProvider, ConnectionStatus } from '../../../../providers/network-state/network-state';
import { LoneWorkerConfigProvider, LocationUpdateConfig } from '../../providers/lone-worker-config.provider';
import { LocationProvider } from '../../providers/location.provider';

export const secondsToMilliseconds = (seconds: number): number => seconds * 1000;
export const minutesToMilliseconds = (minutes: number): number => secondsToMilliseconds(minutes * 60);

export const defaultLocationUpdateConfig: LocationUpdateConfig = {
  pollFrequencySeconds: 30,
  timeoutMinutes: 90,
};

@Injectable()
export class RaisedAlertEffects {
  constructor(
        private actions$: Actions,
        private alertProvider: AlertProvider,
        private locationProvider: LocationProvider,
        private networkStateProvider: NetworkStateProvider,
        private configProvider: LoneWorkerConfigProvider,
  ) {}

  @Effect()
  sendRedAlert$ = this.actions$.pipe(
    ofType<alertActions.SendRedAlert>(alertActions.SEND_RED_ALERT),
    switchMap((action) => {
      return this.alertProvider.triggerAlert(action.incident).pipe(
        map(receipt => new alertActions.RedAlertSent(receipt)),
        catchError((err: HttpErrorResponse) => of(new alertActions.RedAlertSendFailure(err))),
      );
    }),
  );

  @Effect()
  sendAmberAlert$ = this.actions$.pipe(
    ofType<alertActions.SendAmberAlert>(alertActions.SEND_AMBER_ALERT),
    switchMap((action) => {
      return this.alertProvider.triggerAlert(action.incident).pipe(
        map(receipt => new alertActions.AmberAlertSent(receipt)),
        catchError((err: HttpErrorResponse) => of(new alertActions.AmberAlertSendFailure(err))),
      );
    }),
  );

  private getCurrentLocation(): Observable<Location> {
    return defer(async () => {
      const coords = await this.locationProvider.tryGetCurrentLocation();
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp: new Date(),
      };
    });
  }

  private createPollAndSendLocationEffect<TAction extends alertActions.AmberAlertSent | alertActions.RedAlertSent>(
    actionType: string,
    severity: Severity,
    locationUpdateConfig: LocationUpdateConfig,
  ): Observable<alertActions.UpdateIncidentLocationResultReceived | alertActions.UpdateIncidentLocationFailure> {
    return this.actions$.pipe(
      ofType<TAction>(actionType),
      switchMap((action) => {
        const config: LocationUpdateConfig = {
          ...defaultLocationUpdateConfig,
          ...locationUpdateConfig,
        };

        const pollFrequencyMilliseconds = secondsToMilliseconds(config.pollFrequencySeconds);
        console.log(`${severity} Alert: Location Update: will POLL every ${pollFrequencyMilliseconds} milliseconds`);

        const pollsWhenOnline$ = interval(pollFrequencyMilliseconds).pipe(
          withLatestFrom(
            this.networkStateProvider.onNetworkChange(),
          ),
          filter(([, connectionStatus]) => connectionStatus === ConnectionStatus.ONLINE));

        const timeoutMilliseconds = minutesToMilliseconds(config.timeoutMinutes);
        console.log(`${severity} Alert: Location Update: will TIMEOUT after ${timeoutMilliseconds} milliseconds`);

        const incidentId = action.sentReceipt.incidentId;
        return pollsWhenOnline$.pipe(
          switchMap(() => {
            return this.getCurrentLocation().pipe(
              concatMap((currentLocation) => {
                return this.alertProvider.updateIncidentLocation(incidentId, currentLocation).pipe(
                  map(updatedIncident => new alertActions.UpdateIncidentLocationResultReceived(updatedIncident)),
                  catchError((err: HttpErrorResponse) =>
                    of(new alertActions.UpdateIncidentLocationFailure(incidentId, severity, err))));
              }),
              catchError((err) => {
                console.log(err.permissionDenied ?
                  'User has disallowed location sharing' :
                  `Device unable to get geolocation: ${err.message}`);
                return EMPTY;
              }),
            );
          }),
          takeUntil(timer(timeoutMilliseconds)),
        );
      }),
    );
  }

  @Effect()
  pollAndSendLocationRedAlert$ = this.createPollAndSendLocationEffect<alertActions.RedAlertSent>(
    alertActions.RED_ALERT_SENT,
    Severity.Red,
    this.configProvider.redLocationUpdate);

  @Effect()
  pollAndSendLocationAmberAlert$ = this.createPollAndSendLocationEffect<alertActions.AmberAlertSent>(
    alertActions.AMBER_ALERT_SENT,
    Severity.Amber,
    this.configProvider.amberLocationUpdate);
}
