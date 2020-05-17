import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { ReceivedIncident } from '../../store/amber-alert/amber-alert.model';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../store/store.model';
import { AmberIncidentViewClosed } from '../../store/amber-alert/amber-alert.actions';

@IonicPage()
@Component({
  selector: 'lw-amber-alert-modal',
  templateUrl: 'amber-alert-modal.page.html',
})
export class AmberAlertModalPage {

  incident: ReceivedIncident;

  constructor(
        private navController: NavController,
        private navParams: NavParams,
        private store$: Store<StoreModel>,
    ) {
    this.incident = this.navParams.get('incident');
  }

  close(): void {
    this.navController.pop();
    this.store$.dispatch(new AmberIncidentViewClosed());
  }
}
