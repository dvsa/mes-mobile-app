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
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/cat-c/candidate/candidate.cat-c.reducer';
import {
  CalculateTestResult,
  TerminateTestFromTestReport,
  TestReportViewDidEnter,
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
import { getTestData } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestReportState } from '../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { hasManoeuvreBeenCompletedCatC } from '../../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import { ModalEvent } from '../test-report.constants';
import { CAT_C, LEGAL_REQUIREMENTS_MODAL } from '../../page-names.constants';
import { OverlayCallback } from '../test-report.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import {
  getTestRequirementsCatC,
} from '../../../modules/tests/test-data/cat-c/test-requirements/test-requirements.cat-c.reducer';
import { legalRequirementsLabels } from '../../../shared/constants/legal-requirements/legal-requirements.constants';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { isDelegatedTest } from '../../../modules/tests/delegated-test/delegated-test.selector';
import { getDelegatedTestIndicator } from '../../../modules/tests/delegated-test/delegated-test.reducer';
import { getNextPageDebriefOffice } from '../../../shared/constants/getNextPageDebriefOffice.constants';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvres$: Observable<boolean>;
  testData$: Observable<CatCUniqueTypes.TestData>;
  testRequirements$: Observable<CatCUniqueTypes.TestRequirements>;
  testCategory$: Observable<CategoryCode>;
  delegatedTest$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: '.test-report-cat-c-page',
  templateUrl: 'test-report.cat-c.page.html',
})
export class TestReportCatCPage extends BasePageComponent {
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
  testCategory: CategoryCode;
  isDelegated: boolean;

  modal: Modal;
  missingLegalRequirements: legalRequirementsLabels[] = [];

  constructor(
    public store$: Store<StoreModel>,
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private modalController: ModalController,
    public testReportValidatorProvider: TestReportValidatorProvider,
  ) {
    super(platform, navController, authenticationProvider);
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
        select(hasManoeuvreBeenCompletedCatC),
      ),
      testData$: currentTest$.pipe(
        select(getTestData),
      ),
      testRequirements$: currentTest$.pipe(
        select(getTestData),
        select(getTestRequirementsCatC),
      ),
      testCategory$: currentTest$.pipe(
        select(getTestCategory),
      ),
      delegatedTest$: currentTest$.pipe(
        select(getDelegatedTestIndicator),
        select(isDelegatedTest),
      ),
    };
    this.setupSubscription();

  }
  ionViewDidEnter(): void {

    // it is possible that we come back to the page from the terminate screen
    // so need to re-establish the subscription if it doesn't exists or is closed
    if (!this.subscription || this.subscription.closed) {
      this.setupSubscription();
    }
    this.store$.dispatch(new TestReportViewDidEnter());
  }

  toggleReportOverlay(): void {
    this.displayOverlay = !this.displayOverlay;
  }

  ionViewDidLeave(): void {
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
      testCategory$,
      delegatedTest$,
    } = this.pageState;

    this.subscription = merge(
      candidateUntitledName$,
      isRemoveFaultMode$.pipe(map(result => (this.isRemoveFaultMode = result))),
      isSeriousMode$.pipe(map(result => (this.isSeriousMode = result))),
      isDangerousMode$.pipe(map(result => (this.isDangerousMode = result))),
      manoeuvres$.pipe(map(result => (this.manoeuvresCompleted = result))),
      testCategory$.pipe(map(result => this.testCategory = result)),
      delegatedTest$.pipe(map(result => this.isDelegated = result)),
      testData$.pipe(
        map((data) => {
          this.isTestReportValid =
            this.testReportValidatorProvider.isTestReportValid(
              data,
              this.testCategory as TestCategory,
              this.isDelegated,
            );
          this.missingLegalRequirements =
            this.testReportValidatorProvider.getMissingLegalRequirements(
              data,
              this.testCategory as TestCategory,
              this.isDelegated,
            );
          this.isEtaValid = this.testReportValidatorProvider.isETAValid(data, this.testCategory as TestCategory);
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
          isDelegated: this.isDelegated,
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
        this.navController.push(getNextPageDebriefOffice(CAT_C, this.isDelegated));
        break;
      case ModalEvent.TERMINATE:
        this.store$.dispatch(new TerminateTestFromTestReport());
        this.navController.push(getNextPageDebriefOffice(CAT_C, this.isDelegated));
        break;
    }
  }

  onCancel = (): void => {
    this.modal.dismiss();
  }

  onContinue = (): void => {
    this.modal.dismiss().then(() => this.navController.push(getNextPageDebriefOffice(CAT_C, this.isDelegated)));
  }

  onTerminate = (): void => {
    this.modal.dismiss().then(() => this.navController.push(getNextPageDebriefOffice(CAT_C, this.isDelegated)));
  }

  showUncoupleRecouple = (): boolean => this.testCategory === TestCategory.CE || this.testCategory === TestCategory.C1E;
}
