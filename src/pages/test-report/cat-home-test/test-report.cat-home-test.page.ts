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
import { map, withLatestFrom } from 'rxjs/operators';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
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
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestReportState } from '../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { ModalEvent } from '../test-report.constants';
import { CAT_HOME_TEST, LEGAL_REQUIREMENTS_MODAL, SPECIAL_REQUIREMENT_MODAL } from '../../page-names.constants';
import { OverlayCallback } from '../test-report.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { legalRequirementsLabels }
 from '../../../shared/constants/legal-requirements/legal-requirements.constants';
import { getTestCategory } from '../../../modules/tests/category/category.reducer';
import { CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { getCandidate } from '../../../modules/tests/journal-data/cat-home/candidate/candidate.cat-home.reducer';
import { TestDataByCategoryProvider } from '../../../providers/test-data-by-category/test-data-by-category';
import {
  hasManoeuvreBeenCompletedCatHomeTest,
} from '../../../modules/tests/test-data/cat-home-test/test-data.cat-home.selector';
import {
  getTestRequirementsCatHome,
} from '../../../modules/tests/test-data/cat-home-test/test-requirements/test-requirements.cat-home.reducer';
import {
  CatHomeTestData,
  HomeTestRequirements,
} from '../../../shared/unions/test-schema-unions';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvres$: Observable<boolean>;
  testData$: Observable<CatHomeTestData>;
  testRequirements$: Observable<HomeTestRequirements>;
  testCategory$: Observable<CategoryCode>;
}

@IonicPage()
@Component({
  selector: '.test-report-cat-home-test-page',
  templateUrl: 'test-report.cat-home-test.page.html',
})
export class TestReportCatHomeTestPage extends BasePageComponent {
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
    private testDataByCategory: TestDataByCategoryProvider,
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

    const category$ = currentTest$.pipe(
      select(getTestCategory),
      map(category => category as TestCategory),
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
        withLatestFrom(category$),
        map(([data , category]) => this.testDataByCategory.getTestDataByCategoryCode(category)(data)),
        select(hasManoeuvreBeenCompletedCatHomeTest),
      ),
      testData$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data , category]) => this.testDataByCategory.getTestDataByCategoryCode(category)(data)),
      ),
      testRequirements$: currentTest$.pipe(
        withLatestFrom(category$),
        map(([data , category]) => this.testDataByCategory.getTestDataByCategoryCode(category)(data)),
        select(getTestRequirementsCatHome),
      ),
      testCategory$: currentTest$.pipe(
        select(getTestCategory),
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
    } = this.pageState;

    this.subscription = merge(
      candidateUntitledName$,
      isRemoveFaultMode$.pipe(map(result => (this.isRemoveFaultMode = result))),
      isSeriousMode$.pipe(map(result => (this.isSeriousMode = result))),
      isDangerousMode$.pipe(map(result => (this.isDangerousMode = result))),
      manoeuvres$.pipe(map(result => (this.manoeuvresCompleted = result))),
      testCategory$.pipe(map(result => this.testCategory = result)),
      testData$.pipe(
        map((data) => {
          this.isTestReportValid =
            this.testReportValidatorProvider.isTestReportValid(data, this.testCategory as TestCategory);
          this.missingLegalRequirements =
            this.testReportValidatorProvider.getMissingLegalRequirements(data, this.testCategory as TestCategory);
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
        },
        options,
      );
    }  else if (!this.isEtaValid) {
      this.modal = this.modalController.create('EtaInvalidModal', {}, options);
    } else if (!this.manoeuvresCompleted && this.testCategory !== TestCategory.K) {
      this.modal = this.modalController.create(
        SPECIAL_REQUIREMENT_MODAL,
        null,
        options,
      );
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
        this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE);
        break;
      case ModalEvent.TERMINATE:
        this.store$.dispatch(new TerminateTestFromTestReport());
        this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE);
        break;
    }
  }

  onCancel = (): void => {
    this.modal.dismiss();
  }

  onContinue = (): void => {
    this.modal.dismiss().then(() => this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE));
  }

  onTerminate = (): void => {
    this.modal.dismiss().then(() => this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE));
  }

  showManoeuvreButton = (): boolean => {
    return this.testCategory !== TestCategory.K;
  }
}
