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
} from '../../modules/tests/vehicle-details/vehicle-details.actions';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import {
  InstructorAccompanimentToggled,
  OtherAccompanimentToggled,
  SupervisorAccompanimentToggled,
} from '../../modules/tests/accompaniment/accompaniment.actions';
import { getVehicleDetails } from '../../modules/tests/vehicle-details/vehicle-details.reducer';
import { getAccompaniment } from '../../modules/tests/accompaniment/accompaniment.reducer';
import { InstructorRegistrationNumberChanged } from '../../modules/tests/instructor-details/instructor-details.actions';
import {
  getRegistrationNumber,
  getGearboxCategory,
  getSchoolCar,
  getDualControls,
} from '../../modules/tests/vehicle-details/vehicle-details.selector';
import {
  getInstructorAccompaniment,
  getSupervisorAccompaniment,
  getOtherAccompaniment,
} from '../../modules/tests/accompaniment/accompaniment.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { getUntitledCandidateName } from '../../modules/tests/candidate/candidate.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import {
  EyesightPassPressed,
  EyesightFailPressed,
} from '../../modules/ui-state/waiting-room-to-car/waiting-room-to-car.actions';

interface WaitingRoomToCarPageState {
  candidateName$: Observable<string>;
  registrationNumber$: Observable<string>;
  transmission$: Observable<GearboxCategory>;
  schoolCar$: Observable<boolean>;
  dualControls$: Observable<boolean>;
  instructorAccompaniment$: Observable<boolean>;
  supervisorAccompaniment$: Observable<boolean>;
  otherAccompaniment$: Observable<boolean>;
  eyesightPassRadioChecked$: Observable<boolean>;
  eyesightFailRadioChecked$: Observable<boolean>;
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

  inputSubscriptions: Subscription[] = [];

  showEyesightFailureConfirmation: boolean = false;

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
      candidateName$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      registrationNumber$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getVehicleDetails),
        select(getRegistrationNumber),
      ),
      transmission$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getVehicleDetails),
        select(getGearboxCategory),
      ),
      schoolCar$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getVehicleDetails),
        select(getSchoolCar),
      ),
      dualControls$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getVehicleDetails),
        select(getDualControls),
      ),
      instructorAccompaniment$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getAccompaniment),
        select(getInstructorAccompaniment),
      ),
      supervisorAccompaniment$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getAccompaniment),
        select(getSupervisorAccompaniment),
      ),
      otherAccompaniment$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getAccompaniment),
        select(getOtherAccompaniment),
      ),
      eyesightPassRadioChecked$: this.store$.pipe(
        select(root => root.ui),
        // @ts-ignore
        select(ui => ui.waitingRoomToCar),
        select(wrtc => wrtc.eyesightRadioState),
        map(eyesightRadioState => eyesightRadioState === 'pass'),
      ),
      eyesightFailRadioChecked$: this.store$.pipe(
        select(root => root.ui),
        // @ts-ignore
        select(ui => ui.waitingRoomToCar),
        select(wrtc => wrtc.eyesightRadioState),
        map(eyesightRadioState => eyesightRadioState === 'fail'),
      ),
    };
    this.inputSubscriptions = [
      this.inputChangeSubscriptionDispatchingAction(this.regisrationInput, VehicleRegistrationChanged),
      this.inputChangeSubscriptionDispatchingAction(
        this.instructorRegisrationInput,
        InstructorRegistrationNumberChanged,
      ),
    ];
  }

  ngOnDestroy(): void {
    this.inputSubscriptions.forEach(sub => sub.unsubscribe());
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

  /**
   * Returns a subscription to the debounced changes of a particular input fields.
   * Dispatches the provided action type to the store when a new value is yielded.
   * @param inputRef The input to listen for changes on.
   * @param actionType The the type of action to dispatch, should accept an argument for the input value.
   */
  inputChangeSubscriptionDispatchingAction(inputRef: ElementRef, actionType: any): Subscription {
    const changeStream$ = fromEvent(inputRef.nativeElement, 'keyup').pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
      );
    const subscription = changeStream$
      .subscribe((newVal: string) => this.store$.dispatch(new actionType(newVal)));
    return subscription;
  }

  setEyesightFailureVisibility(show: boolean) {
    this.showEyesightFailureConfirmation = show;
  }

  eyesightPassPressed(): void {
    this.store$.dispatch(new EyesightPassPressed());
  }

  eyesightFailPressed(): void {
    this.store$.dispatch(new EyesightFailPressed());
  }
}
