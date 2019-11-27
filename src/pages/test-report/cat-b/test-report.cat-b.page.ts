import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  ModalController,
  Modal,
} from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/candidate/candidate.reducer';
import {
  TestReportViewDidEnter,
  CalculateTestResult,
  TerminateTestFromTestReport,
} from '../test-report.actions';
import {
  getCurrentTest,
  getJournalData,
} from '../../../modules/tests/tests.selector';
import {
  Competencies,
  LegalRequirements,
  ExaminerActions,
} from '../../../modules/tests/test-data/test-data.constants';
import { getTestData } from '../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestReportState } from '../test-report.reducer';
import {
  isRemoveFaultMode,
  isSeriousMode,
  isDangerousMode,
  isLegalRequirementsValid,
  isEtaValid,
} from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { CatBLegalRequirements } from '../../../modules/tests/test-data/test-data.models';
import {
  getCatBLegalRequirements,
  hasManoeuvreBeenCompleted,
} from '../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { ModalEvent } from '../test-report.constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { StatusBar } from '@ionic-native/status-bar';
import { CAT_B } from '../../page-names.constants';
import { OverlayCallback } from '../test-report.model';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvres$: Observable<boolean>;
  isLegalRequirementsValid$: Observable<boolean>;
  isEtaValid$: Observable<boolean>;
  catBLegalRequirements$: Observable<CatBLegalRequirements>;
}

@IonicPage()
@Component({
  selector: 'test-report-cat-b-page',
  templateUrl: 'test-report.cat-b.page.html',
})
export class TestReportCatBPage extends PracticeableBasePageComponent {
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
  isLegalRequirementsValid: boolean = false;
  isEtaValid: boolean = true;

  modal: Modal;
  catBLegalRequirements: CatBUniqueTypes.TestRequirements;

  constructor(
    store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private modalController: ModalController,
    public testReportValidatorProvider: TestReportValidatorProvider,
    public screenOrientation: ScreenOrientation,
    public insomnia: Insomnia,
    public statusBar: StatusBar,
  ) {
    super(platform, navController, authenticationProvider, store$);
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
    super.ngOnInit();
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
      isLegalRequirementsValid$: this.store$.pipe(
        select(getTestReportState),
        select(isLegalRequirementsValid),
      ),
      isEtaValid$: this.store$.pipe(
        select(getTestReportState),
        select(isEtaValid),
      ),
      catBLegalRequirements$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getCatBLegalRequirements),
      ),
    };
    this.setupSubscription();

  }

  ionViewWillEnter(): boolean {
    // ionViewWillEnter lifecylce event used to ensure screen orientation is correct before page transition
    if (super.isIos() && this.isPracticeMode) {
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY,
      );
      this.insomnia.keepAwake();
      this.statusBar.hide();
    }

    return true;
  }

  ionViewDidEnter(): void {

    // it is possible that we come back to the page from the terminate screen
    // so need to re-establish the subscription if it doesn't exists or is closed
    if (!this.subscription || this.subscription.closed) {
      this.setupSubscription();
    }
    this.store$.dispatch(new TestReportViewDidEnter());
  }

  ionViewWillLeave() {
    if (super.isIos() && this.isPracticeMode) {
      this.statusBar.show();
    }
  }

  toggleReportOverlay(): void {
    this.displayOverlay = !this.displayOverlay;
  }

  ionViewDidLeave(): void {
    super.ionViewDidLeave();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  setupSubscription() {
    const {
      candidateUntitledName$,
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
      manoeuvres$,
      isLegalRequirementsValid$,
      isEtaValid$,
      catBLegalRequirements$,
    } = this.pageState;

    this.subscription = merge(
      candidateUntitledName$,
      isRemoveFaultMode$.pipe(map(result => (this.isRemoveFaultMode = result))),
      isSeriousMode$.pipe(map(result => (this.isSeriousMode = result))),
      isDangerousMode$.pipe(map(result => (this.isDangerousMode = result))),
      manoeuvres$.pipe(map(result => (this.manoeuvresCompleted = result))),
      isLegalRequirementsValid$.pipe(
        map(result => (this.isLegalRequirementsValid = result)),
      ),
      isEtaValid$.pipe(map(result => (this.isEtaValid = result))),
      catBLegalRequirements$.pipe(
        map(result => (this.catBLegalRequirements = result)),
      ),
    ).subscribe();
  }

  onEndTestClick = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    if (!this.isLegalRequirementsValid) {
      this.modal = this.modalController.create(
        'LegalRequirementsModal',
        {
          legalRequirements: this.catBLegalRequirements,
        },
        options,
      );
    } else if (!this.isEtaValid) {
      this.modal = this.modalController.create('EtaInvalidModal', {}, options);
    } else {
      this.modal = this.modalController.create('EndTestModal', {}, options);
    }
    this.modal.onDidDismiss(this.onModalDismiss);
    this.modal.present();
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.CONTINUE:
        this.store$.dispatch(new CalculateTestResult());
        this.navController.push(CAT_B.DEBRIEF_PAGE);
        break;
      case ModalEvent.TERMINATE:
        this.store$.dispatch(new TerminateTestFromTestReport());
        this.navController.push(CAT_B.DEBRIEF_PAGE);
        break;
    }
  }

  onCancel = (): void => {
    this.modal.dismiss();
  }

  onContinue = (): void => {
    this.modal.dismiss().then(() => this.navController.push(CAT_B.DEBRIEF_PAGE));
  }

  onTerminate = (): void => {
    this.modal.dismiss().then(() => this.navController.push(CAT_B.DEBRIEF_PAGE));
  }
}
