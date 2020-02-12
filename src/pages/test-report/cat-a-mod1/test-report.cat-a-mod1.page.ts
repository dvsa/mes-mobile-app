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
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { StoreModel } from '../../../shared/models/store.model';
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';

// TODO - PREP-AMOD1: Use cat amod1 reducer
import { getCandidate } from '../../../modules/tests/journal-data/cat-be/candidate/candidate.cat-be.reducer';
import {
  TestReportViewDidEnter, TerminateTestFromTestReport, CalculateTestResult,
} from '../test-report.actions';
import {
  getCurrentTest,
  getJournalData,
} from '../../../modules/tests/tests.selector';
import {
  Competencies,
  ExaminerActions,
  SingleFaultCompetencyNames,
} from '../../../modules/tests/test-data/test-data.constants';
import { getTestData } from '../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestReportState } from '../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import { ModalEvent } from '../test-report.constants';
import { CAT_A_MOD1 } from '../../page-names.constants';
import { OverlayCallback } from '../test-report.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { SpeedCheckState } from '../../../providers/test-report-validator/test-report-validator.constants';
import { ModalReason } from './components/activity-code-4-modal/activity-code-4-modal.constants';
import { speedCheckLabels } from '../../../shared/constants/competencies/cata-mod1-speed-checks';
import { SpeedRequirementNotMetModalOpened, EmergencyStopDangerousFaultModelOpened,
EmergencyStopSeriousFaultModelOpened } from './test-report.cat-a-mod1.actions';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  testData$: Observable<TestData>;
}

@IonicPage()
@Component({
  selector: '.test-report-cat-a-mod1-page',
  templateUrl: 'test-report.cat-a-mod1.page.html',
})
export class TestReportCatAMod1Page extends BasePageComponent {
  pageState: TestReportPageState;
  subscription: Subscription;
  competencies = Competencies;
  singleFaultCompetencyNames = SingleFaultCompetencyNames;
  eta = ExaminerActions;
  displayOverlay: boolean;
  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;
  manoeuvresCompleted: boolean = false;
  speedCheckState: SpeedCheckState;
  isEtaValid: boolean = true;

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
      testData$: currentTest$.pipe(
        select(getTestData),
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
      testData$,
    } = this.pageState;

    this.subscription = merge(
      candidateUntitledName$,
      isRemoveFaultMode$.pipe(map(result => (this.isRemoveFaultMode = result))),
      isSeriousMode$.pipe(map(result => (this.isSeriousMode = result))),
      isDangerousMode$.pipe(map(result => (this.isDangerousMode = result))),
      testData$.pipe(
        map((data) => {
          this.speedCheckState =
            this.testReportValidatorProvider.validateSpeedChecksCatAMod1(data);
          this.isEtaValid = this.testReportValidatorProvider.isETAValid(data, TestCategory.EUAM1);
        }),
      ),
    ).subscribe();
  }

  onEndTestClick = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    let modal: Modal = null;

    if (modal === null) {
      modal = this.createEtaInvalidModal(options);
    }

    if (modal === null) {
      modal = this.createSpeedCheckModal(options);
    }

    if (modal === null) {
      modal = this.createActivityCode4Modal(options);
    }

    if (modal === null) {
      modal = this.createEndTestModal(options);
    }

    modal.onDidDismiss(this.onModalDismiss);
    modal.present();
  }

  onModalDismiss = (event: ModalEvent): void => {
    switch (event) {
      case ModalEvent.CANCEL:
        break;
      case ModalEvent.TERMINATE:
        this.store$.dispatch(new TerminateTestFromTestReport());
        this.navController.push(CAT_A_MOD1.DEBRIEF_PAGE);
        break;
      case ModalEvent.CONTINUE:
        this.store$.dispatch(new CalculateTestResult());
        this.navController.push(CAT_A_MOD1.DEBRIEF_PAGE);
        break;
      case ModalEvent.END_WITH_ACTIVITY_CODE_4:
        this.store$.dispatch(new SetActivityCode('4'));
        this.navController.push(CAT_A_MOD1.DEBRIEF_PAGE);
        break;
    }
  }

  createEtaInvalidModal(options: any): Modal | null {
    if (!this.isEtaValid) {
      return this.modalController.create('EtaInvalidModal', {}, options);
    }
    return null;
  }

  createEndTestModal(options: any): Modal | null {
    if (this.speedCheckState === SpeedCheckState.VALID) {
      return this.modalController.create('EndTestModal', {}, options);
    }
    return null;
  }

  createSpeedCheckModal(options: any): Modal | null {
    switch (this.speedCheckState) {
      case SpeedCheckState.EMERGENCY_STOP_AND_AVOIDANCE_MISSING:
        return this.modalController.create(
          'SpeedCheckModal',
          { speedChecksNeedCompleting: [speedCheckLabels.speedCheckEmergency, speedCheckLabels.speedCheckAvoidance] },
          options,
        );
      case SpeedCheckState.EMERGENCY_STOP_MISSING:
        return this.modalController.create(
          'SpeedCheckModal',
          { speedChecksNeedCompleting: [speedCheckLabels.speedCheckEmergency] },
          options,
        );
      case SpeedCheckState.AVOIDANCE_MISSING:
        return this.modalController.create(
          'SpeedCheckModal',
          { speedChecksNeedCompleting: [speedCheckLabels.speedCheckAvoidance] },
          options,
        );
      default:
        return null;
    }
  }

  createActivityCode4Modal(options: any): Modal | null {
    switch (this.speedCheckState) {
      case SpeedCheckState.NOT_MET:
        this.store$.dispatch(new SpeedRequirementNotMetModalOpened());
        return this.modalController.create(
          'ActivityCode4Modal',
          { modalReason: ModalReason.SPEED_REQUIREMENTS },
          options,
        );
      case SpeedCheckState.EMERGENCY_STOP_DANGEROUS_FAULT:
        this.store$.dispatch(new EmergencyStopDangerousFaultModelOpened());
        return this.modalController.create(
          'ActivityCode4Modal',
          { modalReason: ModalReason.EMERGENCY_STOP_DANGEROUS },
          options,
        );
      case SpeedCheckState.EMERGENCY_STOP_SERIOUS_FAULT:
        this.store$.dispatch(new EmergencyStopSeriousFaultModelOpened());
        return this.modalController.create(
          'ActivityCode4Modal',
          { modalReason: ModalReason.EMERGENCY_STOP_SERIOUS },
          options,
        );
      default:
        return null;
    }
  }
}
