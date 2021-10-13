import { AlertController, IonicPage, Navbar, NavController } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { merge, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivityCode, GearboxCategory } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { JOURNAL_PAGE } from '../page-names.constants';
import { TransmissionType } from '../../shared/models/transmission-type';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import {
  getActivityCode,
  getCurrentTest,
  getJournalData,
  getTestOutcomeText,
} from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import {
  formatDriverNumber,
  getCandidateDriverNumber,
  getCandidateName,
  getUntitledCandidateName,
} from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getPassCompletion } from '../../modules/tests/pass-completion/pass-completion.reducer';
import { getPassCertificateNumber } from '../../modules/tests/pass-completion/pass-completion.selector';
import { PassCertificateNumberChanged } from '../../modules/tests/pass-completion/pass-completion.actions';
import { getVehicleDetails } from '../../modules/tests/vehicle-details/cat-be/vehicle-details.cat-be.reducer';
import { getGearboxCategory } from '../../modules/tests/vehicle-details/common/vehicle-details.selector';
import {
  ClearGearboxCategory,
  GearboxCategoryChanged,
} from '../../modules/tests/vehicle-details/common/vehicle-details.actions';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
import { SetActivityCode } from '../../modules/tests/activity-code/activity-code.actions';
import { ActivityCodeModel, activityCodeModelList } from '../office/components/activity-code/activity-code.constants';
import { ManoeuvresPageValidationError, ManoeuvresViewDidEnter } from './manoeuvres.actions';
import { SendCurrentTest } from '../../modules/tests/tests.actions';

interface ManoeuvresPageState {
  candidateName$: Observable<string>;
  candidateUntitledName$: Observable<string>;
  candidateDriverNumber$: Observable<string>;
  passCertificateNumber$: Observable<string>;
  transmission$: Observable<TransmissionType>;
  testCategory$: Observable<TestCategory>;
  testOutcomeText$: Observable<string>;
  activityCode$: Observable<ActivityCodeModel>;
}

@IonicPage()
@Component({
  selector: 'page-manoeuvres',
  templateUrl: 'manoeuvres.html',
})
export class ManoeuvresPage implements OnInit {

  @ViewChild(Navbar) navBar: Navbar;
  public exercises: string[] = ['Manoeuvre'];
  public passCode: ActivityCode = '1';
  public pageState: ManoeuvresPageState;
  public form: FormGroup;
  public merged$: Observable<string | ActivityCodeModel>;
  public subscription: Subscription;
  public category: TestCategory;
  public activityCodeOptions: ActivityCodeModel[];
  public activityCodeSelected: ActivityCodeModel;
  private testOutcome: string;
  private candidateName: string;
  candidateButton = (): void => {};

  constructor(
    private store$: Store<StoreModel>,
    private navController: NavController,
    private alertController: AlertController,
  ) {
    this.form = new FormGroup({});
    this.activityCodeOptions = activityCodeModelList;
  }

  ngOnInit(): void {
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
      passCertificateNumber$: currentTest$.pipe(
        select(getPassCompletion),
        select(getPassCertificateNumber),
      ),
      transmission$: currentTest$.pipe(
        select(getVehicleDetails),
        select(getGearboxCategory),
        map(gearboxCategory => gearboxCategory as TransmissionType),
      ),
      testCategory$: currentTest$.pipe(
        select(getTestCategory),
        map(testCategory => testCategory as TestCategory),
      ),
      testOutcomeText$: currentTest$.pipe(
        select(getTestOutcomeText),
      ),
      activityCode$: currentTest$.pipe(
        select(getActivityCode),
      ),
    };

    const { activityCode$, testCategory$, testOutcomeText$, candidateUntitledName$ } = this.pageState;

    this.merged$ = merge(
      testCategory$.pipe(
        map(value => this.category = value),
        tap((category) => {
          if (category && category.includes('E')) this.exercises.push('Uncouple/Recouple');
        }),
      ),
      testOutcomeText$.pipe(map(value => this.testOutcome = value)),
      candidateUntitledName$.pipe(tap(value => this.candidateName = value)),
      activityCode$.pipe(tap(value => this.activityCodeSelected = value)),
    );
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new ManoeuvresViewDidEnter());
    this.navBar.backButtonClick = () => {
      this.clickBack();
    };
  }

  clickBack(): void {
    this.navController.pop();
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }
    return true;
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  passCertificateNumberChanged(passCertificateNumber: string): void {
    this.store$.dispatch(new PassCertificateNumberChanged(passCertificateNumber));
  }

  transmissionChanged(transmission: GearboxCategory): void {
    this.store$.dispatch(new GearboxCategoryChanged(transmission));
  }

  activityCodeChanged(activityCodeModel: ActivityCodeModel): void {
    this.store$.dispatch(new SetActivityCode(activityCodeModel.activityCode));
  }

  async onSubmit(): Promise<void> {
    if (this.isFormValid()) {
      await this.showCompleteModal();
    }
  }

  async showCompleteModal(): Promise<void> {
    const alert = this.alertController.create({
      message: `<br/>
                <b>Submit outcome?</b>
                <br/><br/>
                You are about to submit a ${this.testOutcome} Cat ${this.category} test for ${this.candidateName}
                <br/><br/>
                Do you want to continue?`,
      cssClass: 'confirm-declaration-modal',
      buttons: [
        {
          text: 'Cancel', handler: () => {
          },
        },
        { text: 'Submit', handler: async () => this.onTestDetailsConfirm() },
      ],
      enableBackdropDismiss: false,
    });
    await alert.present();
  }

  isFormValid(): boolean {
    Object.keys(this.form.controls).forEach(controlName => this.form.controls[controlName].markAsDirty());
    if (this.form.valid) {
      return true;
    }
    Object.keys(this.form.controls).forEach((controlName) => {
      if (this.form.controls[controlName].invalid) {
        this.store$.dispatch(new ManoeuvresPageValidationError(`${controlName} is blank`));
      }
    });
    return false;
  }

  async onTestDetailsConfirm(): Promise<void> {
    if (this.activityCodeSelected.activityCode !== this.passCode) {
      // if user selected '1 - Pass' and then changed to fail, reset fields as we do not capture info
      // except in the case of a pass
      this.store$.dispatch(new PassCertificateNumberChanged(null));
      this.store$.dispatch(new ClearGearboxCategory());
    }
    this.store$.dispatch(new SendCurrentTest());
    const journalPage = this.navController.getViews().find(view => view.id === JOURNAL_PAGE);
    await this.navController.popTo(journalPage);
  }

}
