import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { WaitingRoomToCarViewDidEnter } from './waiting-room-to-car.actions';
import { Observable } from 'rxjs/Observable';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { SchoolCarToggled } from '../../modules/tests/vehicle-details/vehicle-details.actions';

interface WaitingRoomToCarPageState {
  registrationNumber$: Observable<string>;
  transmission$: Observable<GearboxCategory>;
  schoolCar$: Observable<boolean>;
  dualControls$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-waiting-room-to-car',
  templateUrl: 'waiting-room-to-car.html',
})
export class WaitingRoomToCarPage extends BasePageComponent{
  pageState: WaitingRoomToCarPageState;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ngOnInit(): void {
    this.pageState = {
      registrationNumber$: this.store$.pipe(
        select(getCurrentTest),
        select(t => t.vehicleDetails),
        select(vd => vd.registrationNumber),
      ),
      transmission$: this.store$.pipe(
        select(getCurrentTest),
        select(t => t.vehicleDetails),
        select(vd => vd.gearboxCategory),
      ),
      schoolCar$: this.store$.pipe(
        select(getCurrentTest),
        select(t => t.vehicleDetails),
        select(vd => vd.schoolCar),
      ),
      dualControls$: this.store$.pipe(
        select(getCurrentTest),
        select(t => t.vehicleDetails),
        select(vd => vd.dualControls),
      ),
    };
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new WaitingRoomToCarViewDidEnter());
  }

  schoolCarToggled(): void {
    this.store$.dispatch(new SchoolCarToggled());
  }
}
