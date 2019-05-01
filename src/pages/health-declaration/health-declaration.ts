import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { BasePageComponent } from '../../shared/classes/base-page';
import { SignatureAreaComponent } from './../../components/signature-area/signature-area';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { HealthDeclarationViewDidEnter } from './health-declaration.actions';
import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DeviceProvider } from '../../providers/device/device';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';
import * as postTestDeclarationsActions
  from '../../modules/tests/post-test-declarations/post-test-declarations.actions';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { getPostTestDeclarations } from '../../modules/tests/post-test-declarations/post-test-declarations.reducer';
import {
  getHealthDeclarationStatus,
  getReceiptDeclarationStatus,
  getSignatureStatus,
} from '../../modules/tests/post-test-declarations/post-test-declarations.selector';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../modules/tests/candidate/candidate.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { map } from 'rxjs/operators';
import { getPassCertificateNumber } from '../../modules/tests/pass-completion/pass-completion.selector';
import { getPassCompletion } from '../../modules/tests/pass-completion/pass-completion.reducer';
import { PersistTests } from '../../modules/tests/tests.actions';

interface HealthDeclarationPageState {
  healthDeclarationAccepted$: Observable<boolean>;
  passCertificateNumberReceived$: Observable<boolean>;
  signature$: Observable<string>;
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  passCertificateNumber$: Observable<string>;
}
@IonicPage()
@Component({
  selector: 'page-health-declaration',
  templateUrl: 'health-declaration.html',
})
export class HealthDeclarationPage extends BasePageComponent {
  @ViewChild(SignatureAreaComponent)
  signatureArea: SignatureAreaComponent;

  @ViewChild(Navbar) navBar: Navbar;

  pageState: HealthDeclarationPageState;

  form: FormGroup;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private deviceProvider: DeviceProvider,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider);
    this.form = new FormGroup(this.getFormValidation());
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new HealthDeclarationViewDidEnter());
    if (super.isIos()) {
      this.deviceProvider.enableSingleAppMode();
    }
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
  }

  ionViewDidLeave(): void {
    if (super.isIos()) {
      this.deviceProvider.disableSingleAppMode();
    }
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

  ionViewWillUnload(): void {
    this.store$.dispatch(new postTestDeclarationsActions.ClearPostTestDeclarations());
  }

  getFormValidation(): { [key: string]: FormControl } {
    return {
      healthCheckboxCtrl: new FormControl('', [Validators.requiredTrue]),
      receiptCheckboxCtrl: new FormControl('', [Validators.requiredTrue]),
      signatureAreaCtrl: new FormControl(null, [Validators.required]),
    };
  }

  ngOnInit(): void {
    this.signatureArea.drawCompleteAction = postTestDeclarationsActions.SIGNATURE_DATA_CHANGED;
    this.signatureArea.clearAction = postTestDeclarationsActions.SIGNATURE_DATA_CLEARED;
    this.signatureArea.signHereText = 'Sign here';
    this.signatureArea.retryButtonText = 'Retry';

    this.pageState = {
      healthDeclarationAccepted$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getPostTestDeclarations),
        select(getHealthDeclarationStatus),
      ),
      passCertificateNumberReceived$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getPostTestDeclarations),
        select(getReceiptDeclarationStatus),
      ),
      signature$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getPostTestDeclarations),
        select(getSignatureStatus),
      ),
      candidateName$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateUntitledName$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      passCertificateNumber$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getPassCompletion),
        select(getPassCertificateNumber),
      ),
    };
  }
  healthDeclarationChanged(): void {
    this.store$.dispatch(new postTestDeclarationsActions.ToggleHealthDeclaration());
  }

  receiptDeclarationChanged(): void {
    this.store$.dispatch(new postTestDeclarationsActions.ToggleReceiptDeclaration());
  }
  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.deviceAuthenticationProvider.triggerLockScreen()
        .then(() => {
          this.store$.dispatch(new PersistTests());
          this.navCtrl.push('BackToOfficePage');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  isCtrlDirtyAndInvalid(controlName: string): boolean {
    return !this.form.value[controlName] && this.form.get(controlName).dirty;
  }

}
