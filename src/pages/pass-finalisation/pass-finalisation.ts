import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import {
  PassFinalisationViewDidEnter,
} from './pass-finalisation.actions';
import {
  PassCertificateNumberChanged,
  ProvisionalLicenseReceived,
  ProvisionalLicenseNotReceived,
} from '../../modules/tests/pass-completion/pass-completion.actions';
import { getPassCompletion } from '../../modules/tests/pass-completion/pass-completion.reducer';
import {
  getPassCertificateNumber,
  isProvisionalLicenseProvided,
  isProvisionalLicenseNotProvided,
} from '../../modules/tests/pass-completion/pass-completion.selector';
import { Observable } from 'rxjs/Observable';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import {
  getCandidateName, getCandidateDriverNumber, formatDriverNumber, getUntitledCandidateName,
} from '../../modules/tests/candidate/candidate.selector';
import { getApplicationReference } from '../../modules/tests/application-reference/application-reference.reducer';
import {
  getApplicationNumber,
} from '../../modules/tests/application-reference/application-reference.selector';
import { getCurrentTest, getJournalData } from '../../modules/tests/tests.selector';
import { map, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { getTests } from '../../modules/tests/tests.reducer';
import { PersistTests } from '../../modules/tests/tests.actions';
import { getVehicleDetails } from '../../modules/tests/vehicle-details/vehicle-details.reducer';
import {
  getGearboxCategory,
  isAutomatic,
  isManual,
} from '../../modules/tests/vehicle-details/vehicle-details.selector';
import { GearboxCategory } from '@dvsa/mes-test-schema/categories/B';
import { GearboxCategoryChanged } from '../../modules/tests/vehicle-details/vehicle-details.actions';

interface PassFinalisationPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  applicationNumber$: Observable<string>;
  provisionalLicenseProvidedRadioChecked$: Observable<boolean>;
  provisionalLicenseNotProvidedRadioChecked$: Observable<boolean>;
  passCertificateNumber$: Observable<string>;
  transmission$: Observable<GearboxCategory>;
  transmissionAutomaticRadioChecked$: Observable<boolean>;
  transmissionManualRadioChecked$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-pass-finalisation',
  templateUrl: 'pass-finalisation.html',
})
export class PassFinalisationPage extends PracticeableBasePageComponent {
  pageState: PassFinalisationPageState;

  @ViewChild('passCertificateNumberInput')
  passCertificateNumberInput: ElementRef;

  inputSubscriptions: Subscription[] = [];

  form: FormGroup;

  constructor(
    store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
  ) {
    super(platform, navCtrl, authenticationProvider, store$);
    this.form = new FormGroup(this.getFormValidation());
  }

  ngOnInit(): void {
    super.ngOnInit();
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      candidateName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateName),
      ),
      candidateUntitledName$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      candidateDriverNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getCandidate),
        select(getCandidateDriverNumber),
        map(formatDriverNumber),
      ),
      applicationNumber$: currentTest$.pipe(
        select(getJournalData),
        select(getApplicationReference),
        select(getApplicationNumber),
      ),
      provisionalLicenseProvidedRadioChecked$: currentTest$.pipe(
        select(getPassCompletion),
        map(isProvisionalLicenseProvided),
        tap((val) => {
          if (val) this.form.controls['provisionalLicenseProvidedCtrl'].setValue('yes');
        }),
      ),
      provisionalLicenseNotProvidedRadioChecked$: currentTest$.pipe(
        select(getPassCompletion),
        map(isProvisionalLicenseNotProvided),
        tap((val) => {
          if (val) this.form.controls['provisionalLicenseProvidedCtrl'].setValue('no');
        }),
      ),
      passCertificateNumber$: currentTest$.pipe(
        select(getPassCompletion),
        select(getPassCertificateNumber),
        tap(val => this.form.controls['passCertificateNumberCtrl'].setValue(val)),
      ),
      transmission$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getGearboxCategory),
      ),
      transmissionAutomaticRadioChecked$: currentTest$.pipe(
        select(getVehicleDetails),
        map(isAutomatic),
        tap((val) => {
          if (val) this.form.controls['transmissionCtrl'].setValue('Automatic');
        }),
      ),
      transmissionManualRadioChecked$: currentTest$.pipe(
        select(getVehicleDetails),
        map(isManual),
        tap((val) => {
          if (val) this.form.controls['transmissionCtrl'].setValue('Manual');
        }),
      ),
    };
    this.inputSubscriptions = [
      this.inputChangeSubscriptionDispatchingAction(this.passCertificateNumberInput, PassCertificateNumberChanged),
    ];
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.inputSubscriptions.forEach(sub => sub.unsubscribe());
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new PassFinalisationViewDidEnter());
  }

  provisionalLicenseReceived(): void {
    this.store$.dispatch(new ProvisionalLicenseReceived());
  }

  provisionalLicenseNotReceived(): void {
    this.store$.dispatch(new ProvisionalLicenseNotReceived());
  }

  transmissionChanged(transmission: GearboxCategory): void {
    this.store$.dispatch(new GearboxCategoryChanged(transmission));
  }

  onSubmit() {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      this.store$.dispatch(new PersistTests());
      this.navCtrl.push('HealthDeclarationPage');
    }
  }

  getFormValidation(): { [key: string]: FormControl } {
    return {
      provisionalLicenseProvidedCtrl: new FormControl(null, [Validators.required]),
      passCertificateNumberCtrl: new FormControl(null, [Validators.required]),
      transmissionCtrl: new FormControl(null, [Validators.required]),
    };
  }
  isCtrlDirtyAndInvalid(controlName: string): boolean {
    return !this.form.value[controlName] && this.form.get(controlName).dirty;
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

}
