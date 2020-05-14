import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, merge } from 'rxjs';
import { RaisedAlertStatusModel } from '../../store/raised-alert/raised-alert.model';
import { map } from 'rxjs/operators';
import { getRaisedAlertStatus } from '../../store/raised-alert/raised-alert.selector';
import { Severity, IncidentCore } from '@dvsa/lw-incident-model';
import { getAlertState } from '../../store/raised-alert/raised-alert.reducer';
import { StoreModel } from '../../store/store.model';

@Component({
  selector: 'lw-sos-button',
  templateUrl: 'sos-button.component.html',
})
export class SosButtonComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private incident: IncidentCore;

  @Input()
  incidentProperties$: Observable<IncidentCore>;

  merged$: Observable<void | IncidentCore>;
  redAlertStatus$: Observable<RaisedAlertStatusModel>;
  amberAlertStatus$: Observable<RaisedAlertStatusModel>;

  constructor(
    private modalController: ModalController,
    private store$: Store<StoreModel>) { }

  status: RaisedAlertStatusModel = new RaisedAlertStatusModel(Severity.Amber);

  ngOnInit(): void {
    this.redAlertStatus$ = this.store$.pipe(
      select(getAlertState),
      map(state => getRaisedAlertStatus(state, Severity.Red)),
    );

    this.amberAlertStatus$ = this.store$.pipe(
      select(getAlertState),
      map(state => getRaisedAlertStatus(state, Severity.Amber)),
    );

    this.merged$ = merge(
      this.redAlertStatus$.pipe(map((status) => {
        if (status.sending || status.received) {
          this.status = status;
        }
      })),
      this.amberAlertStatus$.pipe(map((status) => {
        if (this.status.alertType !== Severity.Red &&
          (status.sending || status.received)) {
          this.status = status;
        }
      })),
      this.incidentProperties$.pipe(map((incident) => {
        console.log(incident);
        this.incident = incident;
      })),
    );

    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }
  }

  raiseSos(): void {
    const modalName = 'RaiseAlertModalPage';

    const modal = this.modalController.create(
      modalName,
      {
        incident: this.incident,
      },
      { cssClass: 'modal-fullscreen' });

    modal.onDidDismiss(() => {
      console.log('Sos Alert Modal dismissed');
    });

    modal.present();
  }

  getStatusClass(): string {
    let cssClass = 'lw-status-label';

    switch (this.status.alertType) {
      case Severity.Red:
        cssClass += ' red';
        break;
      case Severity.Amber:
        cssClass += ' amber';
    }

    return cssClass;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
