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
import { Observable, merge, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/common/candidate/candidate.reducer';
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
import { isRemoveFaultMode, isSeriousMode, isDangerousMode  } from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { ModalEvent } from '../test-report.constants';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { StatusBar } from '@ionic-native/status-bar';
import { CAT_B, LEGAL_REQUIREMENTS_MODAL } from '../../page-names.constants';
import { OverlayCallback } from '../test-report.model';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { hasManoeuvreBeenCompletedCatB } from '../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  getTestRequirementsCatB,
} from '../../../modules/tests/test-data/cat-b/test-requirements/test-requirements.reducer';
import { legalRequirementsLabels } from '../../../shared/constants/legal-requirements/legal-requirements.constants';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvres$: Observable<boolean>;
  testData$: Observable<CatBUniqueTypes.TestData>;
  testRequirements$: Observable<CatBUniqueTypes.TestRequirements>;
}

@IonicPage()
@Component({
  selector: '.test-report-cat-b-page',
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
  isTestReportValid: boolean = false;
  isEtaValid: boolean = true;

  modal: Modal;
  missingLegalRequirements: legalRequirementsLabels[] = [];

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

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      candidateUntitledName$: currentTest$.pipe(
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
      manoeuvres$: currentTest$.pipe(
        select(getTestData),
        select(hasManoeuvreBeenCompletedCatB),
      ),
      testData$: currentTest$.pipe(
        select(getTestData),
      ),
      testRequirements$: currentTest$.pipe(
        select(getTestData),
        select(getTestRequirementsCatB),
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
      testData$,
    } = this.pageState;

    this.subscription = merge(
      candidateUntitledName$,
      isRemoveFaultMode$.pipe(map(result => (this.isRemoveFaultMode = result))),
      isSeriousMode$.pipe(map(result => (this.isSeriousMode = result))),
      isDangerousMode$.pipe(map(result => (this.isDangerousMode = result))),
      manoeuvres$.pipe(map(result => (this.manoeuvresCompleted = result))),
      testData$.pipe(map((data) => {
        this.isTestReportValid =
          this.testReportValidatorProvider.isTestReportValid(data, TestCategory.B);
        this.missingLegalRequirements =
          this.testReportValidatorProvider.getMissingLegalRequirements(data, TestCategory.B);
        this.isEtaValid = this.testReportValidatorProvider.isETAValid(data, TestCategory.B);
      }),
      ),
    ).subscribe();
  }

  onEndTestClick = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    if (!this.isTestReportValid) {
      this.modal = this.modalController.create(
        LEGAL_REQUIREMENTS_MODAL,
        {
          legalRequirements: this.missingLegalRequirements,
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
