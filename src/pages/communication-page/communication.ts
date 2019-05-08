import { IonicPage, Navbar, Platform, NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../shared/classes/base-page';
import { FormGroup } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { DeviceProvider } from '../../providers/device/device';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName,
  getUntitledCandidateName,
  getCandidateDriverNumber,
  formatDriverNumber,
} from '../../modules/tests/candidate/candidate.selector';
import { CommunicationViewDidEnter } from './communication.actions';
import { map } from 'rxjs/operators';

interface CommunicationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
}
@IonicPage()
@Component({
  selector: 'communication',
  templateUrl: 'communication.html',
})
export class CommunicationPage extends BasePageComponent {
  @ViewChild(Navbar) navBar: Navbar;

  form: FormGroup;

  pageState: CommunicationPageState;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceProvider: DeviceProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
    private screenOrientation: ScreenOrientation,
    private insomnia: Insomnia,
  ) {
    super(platform, navCtrl, authenticationProvider);
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new CommunicationViewDidEnter());

    if (super.isIos()) {
      this.deviceProvider.enableSingleAppMode();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      this.insomnia.keepAwake();
    }

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
  }

  clickBack(): void {
    this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      candidateName$: currentTest$.pipe(
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateUntitledName$: currentTest$.pipe(
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: currentTest$.pipe(
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
    };
  }

  onSubmit() {
    this.navController.push('WaitingRoomPage');
  }
}
