import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { WaitingRoomToCarViewDidEnter } from './waiting-room-to-car.actions';
import { Observable } from 'rxjs/Observable';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import {
  SchoolCarToggled,
  DualControlsToggled,
  GearboxCategoryChanged,
  VehicleRegistrationChanged,
  InstructorVehicleRegistrationChanged,
} from '../../modules/tests/vehicle-details/vehicle-details.actions';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import {
  InstructorAccompanimentToggled,
  OtherAccompanimentToggled,
  SupervisorAccompanimentToggled,
} from '../../modules/tests/accompaniment/accompaniment.actions';

interface WaitingRoomToCarPageState {
  registrationNumber$: Observable<string>;
  transmission$: Observable<GearboxCategory>;
  schoolCar$: Observable<boolean>;
  dualControls$: Observable<boolean>;
  instructorAccompaniment$: Observable<boolean>;
  supervisorAccompaniment$: Observable<boolean>;
  otherAccompaniment$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-waiting-room-to-car',
  templateUrl: 'waiting-room-to-car.html',
})
export class WaitingRoomToCarPage extends BasePageComponent{
  pageState: WaitingRoomToCarPageState;

  @ViewChild('registrationInput')
  regisrationInput: ElementRef;

  @ViewChild('instructorRegistrationInput')
  instructorRegisrationInput: ElementRef;

  inputSubscriptions: Subscription[];

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
      instructorAccompaniment$: this.store$.pipe(
        select(getCurrentTest),
        select(t => t.accompaniment),
        select(a => a.ADI),
      ),
      supervisorAccompaniment$: this.store$.pipe(
        select(getCurrentTest),
        select(t => t.accompaniment),
        select(a => a.supervisor),
      ),
      otherAccompaniment$: this.store$.pipe(
        select(getCurrentTest),
        select(t => t.accompaniment),
        select(a => a.other),
      ),
    };
    this.inputSubscriptions = [
      fromEvent(this.regisrationInput.nativeElement, 'keyup').pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
      ).subscribe((regNo: string) => this.store$.dispatch(new VehicleRegistrationChanged(regNo))),
      fromEvent(this.instructorRegisrationInput.nativeElement, 'keyup').pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
      ).subscribe((regNo: string) => this.store$.dispatch(new InstructorVehicleRegistrationChanged(regNo))),
    ];
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new WaitingRoomToCarViewDidEnter());
  }

  schoolCarToggled(): void {
    this.store$.dispatch(new SchoolCarToggled());
  }

  dualControlsToggled(): void {
    this.store$.dispatch(new DualControlsToggled());
  }

  manualTransmission(): void {
    this.store$.dispatch(new GearboxCategoryChanged('Manual'));
  }

  automaticTransmission(): void {
    this.store$.dispatch(new GearboxCategoryChanged('Automatic'));
  }

  instructorAccompanimentToggled(): void {
    this.store$.dispatch(new InstructorAccompanimentToggled());
  }

  supervisorAccompanimentToggled(): void {
    this.store$.dispatch(new SupervisorAccompanimentToggled());
  }

  otherAccompanimentToggled(): void {
    this.store$.dispatch(new OtherAccompanimentToggled());
  }
}
