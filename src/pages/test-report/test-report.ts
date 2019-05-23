import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, Modal } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../../shared/models/store.model';
import { getUntitledCandidateName } from '../../modules/tests/candidate/candidate.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { TestReportViewDidEnter, CalculateTestResult } from './test-report.actions';
import { getCurrentTest, isTestReportPracticeTest, getJournalData } from '../../modules/tests/tests.selector';
import { Competencies, LegalRequirements, ExaminerActions } from '../../modules/tests/test-data/test-data.constants';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import { getTests } from '../../modules/tests/tests.reducer';
import { getTestReportState } from './test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode, isTestValid } from './test-report.selector';
import { TestReportValidatorProvider } from '../../providers/test-report-validator/test-report-validator';
import { CatBLegalRequirements } from '../../modules/tests/test-data/test-data.models';
import { getCatBLegalRequirements, hasManoeuvreBeenCompleted } from '../../modules/tests/test-data/test-data.selector';
import { ModalEvent } from './test-report.constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvres$: Observable<boolean>;
  isTestValid$: Observable<boolean>;
  catBLegalRequirements$: Observable<CatBLegalRequirements>;
  practiceTest$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-test-report',
  templateUrl: 'test-report.html',
})
export class TestReportPage extends PracticeableBasePageComponent {

  pageState: TestReportPageState;
  subscription: Subscription;
  competencies = Competencies;
  legalRequirements = LegalRequirements;
  eta = ExaminerActions;
  displayOverlay: boolean;

  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;
  manoeuvresCompleted: boolean = false;
  isTestValid: boolean = false;
  isPracticeTest: boolean;

  modal: Modal;
  catBLegalRequirements: CatBLegalRequirements;

  constructor(
    store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private modalController: ModalController,
    public testReportValidatorProvider: TestReportValidatorProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
  ) {
    super(platform, navCtrl, authenticationProvider, store$);
    this.displayOverlay = false;
  }
  getCallback(): OverlayCallback {
    return {
      callbackMethod: () => {
        this.toggleReportOverlay();
      },
    };
  }
  ngOnInit(): void {
    this.pageState = {
      candidateUntitledName$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getJournalData),
        select(getCandidate),
        select(getUntitledCandidateName),
      ),
      isRemoveFaultMode$: this.store$.pipe(
        select(getTestReportState),
        select(isRemoveFaultMode),
      ),
      isSeriousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isSeriousMode),
      ),
      isDangerousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isDangerousMode),
      ),
      manoeuvres$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(hasManoeuvreBeenCompleted),
      ),
      isTestValid$: this.store$.pipe(
        select(getTestReportState),
        select(isTestValid),
      ),
      catBLegalRequirements$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getCatBLegalRequirements),
      ),
      practiceTest$: this.store$.pipe(
        select(getTests),
        select(isTestReportPracticeTest),
      ),
    };

    const {
      candidateUntitledName$,
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
      manoeuvres$,
      isTestValid$,
      catBLegalRequirements$,
      practiceTest$,
    } = this.pageState;

    const merged$ = merge(
      candidateUntitledName$,
      isRemoveFaultMode$.pipe(map(result => this.isRemoveFaultMode = result)),
      isSeriousMode$.pipe(map(result => this.isSeriousMode = result)),
      isDangerousMode$.pipe(map(result => this.isDangerousMode = result)),
      manoeuvres$.pipe(map(result => this.manoeuvresCompleted = result)),
      isTestValid$.pipe(map(result => this.isTestValid = result)),
      catBLegalRequirements$.pipe(map(result => this.catBLegalRequirements = result)),
      practiceTest$.pipe(map(value => this.isPracticeTest = value)),
    );
    this.subscription = merged$.subscribe();
  }

  ionViewWillEnter() {
    // ionViewWillEnter lifecylce event used to ensure screen orientation is correct before page transition
    if (super.isIos() && this.isPracticeTest) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      this.insomnia.keepAwake();
    }
    return true;
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new TestReportViewDidEnter());
  }

  toggleReportOverlay(): void {
    this.displayOverlay = !this.displayOverlay;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEndTestClick = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    if (this.isTestValid) {
      this.modal = this.modalController.create('EndTestModal', {}, options);
    } else {
      this.modal = this.modalController.create('LegalRequirementsModal', {
        legalRequirements: this.catBLegalRequirements,
      }, options);
    }
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  getBorderModeCSS(): string {
    return this.isRemoveFaultMode ? 'remove-mode'
    : this.isSeriousMode ? 'serious-mode'
    : this.isDangerousMode ? 'dangerous-mode' : '';
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.CONTINUE:
        this.store$.dispatch(new CalculateTestResult());
        this.navCtrl.push('DebriefPage');
        break;
      case ModalEvent.TERMINATE:
        this.navCtrl.push('DebriefPage');
        break;
    }
  }

  onCancel = (): void => {
    this.modal.dismiss();
  }

  onContinue = (): void => {
    this.modal.dismiss()
    .then(() => this.navCtrl.push('DebriefPage', { outcome: 'pass' }));
  }

  onTerminate = (): void => {
    this.modal.dismiss()
    .then(() => this.navCtrl.push('DebriefPage', { outcome: 'terminated' }));
  }

}

export interface OverlayCallback {
  callbackMethod: () => void;
}
