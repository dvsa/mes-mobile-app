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
import { getUntitledCandidateName } from '../../../modules/tests/journal-data/candidate/candidate.selector';
import { getCandidate } from '../../../modules/tests/journal-data/candidate/candidate.reducer';
import {
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
import { getTestData } from '../../../modules/tests/test-data/test-data.cat-be.reducer';
import { getTests } from '../../../modules/tests/tests.reducer';
import { getTestReportState } from '../test-report.reducer';
import {
  isRemoveFaultMode,
  isSeriousMode,
  isDangerousMode,
  isEtaValid,
} from '../test-report.selector';
import { TestReportValidatorProvider } from '../../../providers/test-report-validator/test-report-validator';
import {
  hasManoeuvreBeenCompleted, getCatBELegalRequirements,
} from '../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { ModalEvent } from '../test-report.constants';
import { CAT_BE } from '../../page-names.constants';
import { OverlayCallback } from '../test-report.model';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { AddDrivingFault } from '../../../modules/tests/test-data/driving-faults/driving-faults.actions';
import { AddSeriousFault } from '../../../modules/tests/test-data/serious-faults/serious-faults.actions';
import { AddDangerousFault } from '../../../modules/tests/test-data/dangerous-faults/dangerous-faults.actions';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import {
  UncoupleRecoupleAddSeriousFault,
  UncoupleRecoupleAddDrivingFault,
} from '../../../modules/tests/test-data/uncouple-recouple/uncouple-recouple.actions';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvres$: Observable<boolean>;
  // isLegalRequirementsValid$: Observable<boolean>;
  isEtaValid$: Observable<boolean>;
  catBELegalRequirements$: Observable<CatBEUniqueTypes.TestRequirements>;
}

@IonicPage()
@Component({
  selector: 'test-report-cat-be-page',
  templateUrl: 'test-report.cat-be.page.html',
})
export class TestReportCatBEPage extends BasePageComponent {
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
  catBELegalRequirements: CatBEUniqueTypes.TestRequirements;

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
        select(hasManoeuvreBeenCompleted),
      ),
      // isLegalRequirementsValid$: this.store$.pipe(
      //   select(getTestReportState),
      //   select(isLegalRequirementsValid),
      // ),
      isEtaValid$: this.store$.pipe(
        select(getTestReportState),
        select(isEtaValid),
      ),
      catBELegalRequirements$: currentTest$.pipe(
        select(getTestData),
        select(getCatBELegalRequirements),
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
    // this.store$.dispatch(new TestReportViewDidEnter());
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
      // isLegalRequirementsValid$,
      isEtaValid$,
      catBELegalRequirements$,
    } = this.pageState;

    this.subscription = merge(
      candidateUntitledName$,
      isRemoveFaultMode$.pipe(map(result => (this.isRemoveFaultMode = result))),
      isSeriousMode$.pipe(map(result => (this.isSeriousMode = result))),
      isDangerousMode$.pipe(map(result => (this.isDangerousMode = result))),
      manoeuvres$.pipe(map(result => (this.manoeuvresCompleted = result))),
      // isLegalRequirementsValid$.pipe(
      //   map(result => (this.isLegalRequirementsValid = result)),
      // ),
      isEtaValid$.pipe(map(result => (this.isEtaValid = result))),
      catBELegalRequirements$.pipe(
        map(result => (this.catBELegalRequirements = result)),
      ),
    ).subscribe();
  }

  onEndTestClick = (): void => {
    const options = { cssClass: 'mes-modal-alert text-zoom-regular' };
    if (!this.isLegalRequirementsValid) {
      this.modal = this.modalController.create(
        'LegalRequirementsModal',
        {
          legalRequirements: this.catBELegalRequirements,
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
        this.navController.push(CAT_BE.DEBRIEF_PAGE);
        break;
      case ModalEvent.TERMINATE:
        this.store$.dispatch(new TerminateTestFromTestReport());
        this.navController.push(CAT_BE.DEBRIEF_PAGE);
        break;
    }
  }

  onCancel = (): void => {
    this.modal.dismiss();
  }

  onContinue = (): void => {
    this.modal.dismiss().then(() => this.navController.push(CAT_BE.DEBRIEF_PAGE));
  }

  onTerminate = (): void => {
    this.modal.dismiss().then(() => this.navController.push(CAT_BE.DEBRIEF_PAGE));
  }

  onFailTest = (): void => {
    this.store$.dispatch(new AddDrivingFault(
      {
        competency: Competencies.clearance,
        newFaultCount: 3,
      },
    ));
    this.store$.dispatch(new AddDrivingFault(
      {
        competency: Competencies.moveOffControl,
        newFaultCount: 6,
      },
    ));

    this.store$.dispatch(new AddSeriousFault(Competencies.signalsTimed));
    this.store$.dispatch(new AddDangerousFault(Competencies.useOfSpeed));
    this.store$.dispatch(new UncoupleRecoupleAddSeriousFault());
    this.store$.dispatch(new CalculateTestResult());
    this.navController.push(CAT_BE.DEBRIEF_PAGE);
  }

  onPassTest = (): void => {
    this.store$.dispatch(new AddDrivingFault(
      {
        competency: Competencies.clearance,
        newFaultCount: 3,
      },
    ));
    this.store$.dispatch(new AddDrivingFault(
      {
        competency: Competencies.moveOffControl,
        newFaultCount: 3,
      },
    ));
    this.store$.dispatch(new UncoupleRecoupleAddDrivingFault());
    this.store$.dispatch(new CalculateTestResult());
    this.navController.push(CAT_BE.DEBRIEF_PAGE);
  }

}
