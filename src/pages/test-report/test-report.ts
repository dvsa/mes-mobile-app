import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, Modal } from 'ionic-angular';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../../shared/models/store.model';
import { getUntitledCandidateName } from '../../modules/tests/candidate/candidate.selector';
import { getCandidate } from '../../modules/tests/candidate/candidate.reducer';
import { TestReportViewDidEnter } from './test-report.actions';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { Competencies, LegalRequirements, ExaminerActions } from '../../modules/tests/test-data/test-data.constants';
import { getTestData } from '../../modules/tests/test-data/test-data.reducer';
import { getTests } from '../../modules/tests/tests.reducer';
import { getTestReportState } from './test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from './test-report.selector';
import { hasManoeuvreBeenCompleted } from '../../modules/tests/test-data/test-data.selector';

interface TestReportPageState {
  candidateUntitledName$: Observable<string>;
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvres$: Observable<boolean>;
}

@IonicPage()
@Component({
  selector: 'page-test-report',
  templateUrl: 'test-report.html',
})
export class TestReportPage extends BasePageComponent {

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

  modal: Modal;

  constructor(
    private store$: Store<StoreModel>,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private modalController: ModalController,
  ) {
    super(platform, navCtrl, authenticationProvider);
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
    };

    const {
      candidateUntitledName$,
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
      manoeuvres$,
    } = this.pageState;

    const merged$ = merge(
      candidateUntitledName$,
      isRemoveFaultMode$.pipe(map(result => this.isRemoveFaultMode = result)),
      isSeriousMode$.pipe(map(result => this.isSeriousMode = result)),
      isDangerousMode$.pipe(map(result => this.isDangerousMode = result)),
      manoeuvres$.pipe(map(result => this.manoeuvresCompleted = result)),
    );
    this.subscription = merged$.subscribe();
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
    console.log('Clicked End Test');
    // TODO - MES 2196 to return valid state
    const valid = true;
    if (valid) {
      this.modal = this.modalController.create('EndTestModal', {
        onCancel: this.onCancel,
        onContinue: this.onContinue,
        onTerminate: this.onTerminate,
      });
    } else {
      // TODO - MES-2198 to handle valid state
    }
    this.modal.present();
  }

  pass(): void {
    this.navCtrl.push('DebriefPage', { outcome: 'pass' });
  }

  fail(): void {
    this.navCtrl.push('DebriefPage', { outcome: 'fail' });

  }

  getBorderModeCSS(): string {
    return this.isRemoveFaultMode ? 'remove-mode'
    : this.isSeriousMode ? 'serious-mode'
    : this.isDangerousMode ? 'dangerous-mode' : '';
  }

  onCancel = (): void => {
    this.modal.dismiss();
  }

  onContinue = (): void => {
    this.modal.dismiss()
    .then(() => this.navCtrl.push('DebriefPage', { outcome: 'pass' }));
  }

  onTerminate = (): void => {
    this.modal.dismiss();
    // TODO - MES-59 to handle terminate test page
    // .then(() => this.navCtrl.push('TerminateTestPage'));
  }

}

export interface OverlayCallback {
  callbackMethod: () => void;
}
