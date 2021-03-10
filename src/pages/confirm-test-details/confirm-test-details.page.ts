import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, Navbar, NavController, Platform } from 'ionic-angular';
import { merge, Observable, Subscription } from 'rxjs';
import { PracticeableBasePageComponent } from '../../shared/classes/practiceable-base-page';
import { select, Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';
import { getTests } from '../../modules/tests/tests.reducer';
import {
  getActivityCode,
  getCurrentTest,
  getJournalData,
  getTestOutcomeText,
} from '../../modules/tests/tests.selector';
import { getCandidate } from '../../modules/tests/journal-data/common/candidate/candidate.reducer';
import {
  getCandidateName,
  getUntitledCandidateName,
} from '../../modules/tests/journal-data/common/candidate/candidate.selector';
import { ActivityCodeModel } from '../office/components/activity-code/activity-code.constants';
import { ActivityCode, GearboxCategory } from '@dvsa/mes-test-schema/categories/common';
import { getTestSlotAttributes }
  from '../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.reducer';
import { getTestStartDateTime }
  from '../../modules/tests/journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { getTestCategory } from '../../modules/tests/category/category.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { map, tap } from 'rxjs/operators';
import { isProvisionalLicenseProvided } from '../../modules/tests/pass-completion/pass-completion.selector';
import { getGearboxCategory } from '../../modules/tests/vehicle-details/common/vehicle-details.selector';
import { getTestSummary } from '../../modules/tests/test-summary/common/test-summary.reducer';
import { getD255 } from '../../modules/tests/test-summary/common/test-summary.selector';
import { getPassCompletion } from '../../modules/tests/pass-completion/pass-completion.reducer';
import {
  CAT_A_MOD1,
  CAT_A_MOD2,
  CAT_ADI_PART2,
  CAT_B,
  CAT_BE,
  CAT_C,
  CAT_CPC,
  CAT_D,
  CAT_HOME_TEST,
  CONFIRM_TEST_DETAILS,
} from '../page-names.constants';
import {
  CategorySpecificVehicleDetails,
  VehicleDetailsByCategoryProvider,
} from '../../providers/vehicle-details-by-category/vehicle-details-by-category';
import { TestOutcome } from '../../modules/tests/tests.constants';
import { includes } from 'lodash';
import { ConfirmTestDetailsViewDidEnter } from './confirm-test-details.actions';

interface ConfirmTestDetailsPageState {
  candidateUntitledName$: Observable<string>;
  candidateName$: Observable<string>;
  startDateTime$: Observable<string>;
  testOutcomeText$: Observable<string>;
  activityCode$: Observable<ActivityCodeModel>;
  testCategory$: Observable<TestCategory>;
  provisionalLicense$: Observable<boolean>;
  transmission$: Observable<GearboxCategory>;
  d255$: Observable<boolean>;
}

export enum LicenceReceivedText {
  TRUE = 'Yes - Please retain the candidates licence',
  FALSE = 'No - Please ensure that the licence is kept by the candidate',
}

export enum GearBox {
  AUTOMATIC = 'Automatic - An automatic licence will be issued',
  MANUAL = 'Manual',
}

export enum D255 {
  TRUE = 'Yes - Please complete a D255',
  FALSE = 'No',
}

@IonicPage()
@Component({
  selector: 'confirm-test-details-page',
  templateUrl: 'confirm-test-details.page.html',
})
export class ConfirmTestDetailsPage extends PracticeableBasePageComponent {

  @ViewChild(Navbar) navBar: Navbar;

  pageState: ConfirmTestDetailsPageState;
  category: TestCategory;
  testOutcome: string;
  candidateName: string;
  subscription: Subscription;
  merged$: Observable<boolean | string>;
  vehicleDetails: CategorySpecificVehicleDetails;

  constructor(
    public platform: Platform,
    public navController: NavController,
    public authenticationProvider: AuthenticationProvider,
    store$: Store<StoreModel>,
    public deviceAuthenticationProvider: DeviceAuthenticationProvider,
    public alertController: AlertController,
    public vehicleDetailsProvider: VehicleDetailsByCategoryProvider,
  ) {
    super(platform, navController, authenticationProvider, store$);
  }

  ionViewWillEnter(): boolean {
    if (this.merged$) {
      this.subscription = this.merged$.subscribe();
    }
    return true;
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new ConfirmTestDetailsViewDidEnter());
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.clickBack();
    };
  }

  clickBack(): void {
    this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        this.navController.pop();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
    super.ngOnInit();

    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    let category: TestCategory;
    currentTest$.pipe(select(getTestCategory)).subscribe((value) => {
      category = value as TestCategory;
      const vehicleDetails = this.vehicleDetailsProvider.getVehicleDetailsOnlyByCategoryCode(category);
      this.pageState = {
        candidateUntitledName$: currentTest$.pipe(
          select(getJournalData),
          select(getCandidate),
          select(getUntitledCandidateName),
        ),
        candidateName$: currentTest$.pipe(
          select(getJournalData),
          select(getCandidate),
          select(getCandidateName),
        ),
        startDateTime$: currentTest$.pipe(
          select(getJournalData),
          select(getTestSlotAttributes),
          select(getTestStartDateTime),
        ),
        testOutcomeText$: currentTest$.pipe(
          select(getTestOutcomeText),
        ),
        activityCode$: currentTest$.pipe(
          select(getActivityCode),
        ),
        testCategory$: currentTest$.pipe(
          select(getTestCategory),
          map(testCategory => testCategory as TestCategory),
        ),
        provisionalLicense$: currentTest$.pipe(
          select(getPassCompletion),
          map(isProvisionalLicenseProvided),
        ),
        transmission$: currentTest$.pipe(
          select(vehicleDetails.vehicleDetails),
          select(getGearboxCategory),
        ),
        d255$: currentTest$.pipe(
          select(getTestSummary),
          select(getD255),
        ),
      };
    });

    const { testCategory$, testOutcomeText$, candidateUntitledName$ } = this.pageState;

    this.merged$ = merge(
      testCategory$.pipe(map(value => this.category = value)),
      testOutcomeText$.pipe(map(value => this.testOutcome = value)),
      candidateUntitledName$.pipe(tap(value => this.candidateName = value)),
    );
  }

  isTerminated(testResult: string): boolean {
    return testResult === TestOutcome.Terminated;
  }

  isPassed(testResult: string): boolean {
    return testResult === TestOutcome.Passed;
  }

  getActivityCode(activityCodeModel: ActivityCodeModel): ActivityCode {
    return activityCodeModel.activityCode;
  }

  getProvisionalText(received: boolean): LicenceReceivedText {
    return received ? LicenceReceivedText.TRUE : LicenceReceivedText.FALSE;
  }

  getTransmissionText(gearbox: GearboxCategory): GearBox {
    return gearbox === GearBox.MANUAL ? GearBox.MANUAL : GearBox.AUTOMATIC;
  }

  getD255Text(d255: boolean): D255 {
    return d255 ? D255.TRUE : D255.FALSE;
  }

  async onSubmit() {
    await this.showConfirmTestDetailsModal();
  }

  async showConfirmTestDetailsModal() {
    const alert = this.alertController.create({
      message: `You are about to submit a Cat ${this.category} ${this.testOutcome} for ${this.candidateName}
                <br/><br/>Are you sure you want to submit this result?`,
      cssClass: 'confirm-declaration-modal',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          },
        },
        {
          text: 'Submit',
          handler: () => this.persistAndNavigate(),
        },
      ],
      enableBackdropDismiss: false,
    });
    await alert.present();
  }

  persistAndNavigate() {
    this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        this.navController.push(this.pageToNavigate(this.category, 'BACK_TO_OFFICE_PAGE')).then(() => {
          this.navController.getViews().forEach((view) => {
            if (includes([
              this.pageToNavigate(this.category, 'TEST_REPORT_PAGE'),
              this.pageToNavigate(this.category, 'DEBRIEF_PAGE'),
              this.pageToNavigate(this.category, 'PASS_FINALISATION_PAGE'),
              this.pageToNavigate(this.category, 'HEALTH_DECLARATION_PAGE'),
              CONFIRM_TEST_DETAILS,
            ], view.id)) {
              this.navController.removeView(view);
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Return correct page constant based upon category
   * @param category
   * @param pageName
   */
  pageToNavigate(category, pageName) {
    switch (category) {
      case TestCategory.ADI2:
        return CAT_ADI_PART2[pageName];
      case TestCategory.B:
        return CAT_B[pageName];
      case TestCategory.BE:
        return CAT_BE[pageName];
      case TestCategory.C:
        return CAT_C[pageName];
      case TestCategory.CCPC:
      case TestCategory.DCPC:
        return CAT_CPC[pageName];
      case TestCategory.D:
        return CAT_D[pageName];
      case TestCategory.F:
      case TestCategory.G:
      case TestCategory.H:
      case TestCategory.K:
        return CAT_HOME_TEST[pageName];
      case TestCategory.EUA1M1:
      case TestCategory.EUA2M1:
      case TestCategory.EUAM1:
      case TestCategory.EUAMM1:
        return CAT_A_MOD1[pageName];
      case TestCategory.EUA1M2:
      case TestCategory.EUA2M2:
      case TestCategory.EUAM2:
      case TestCategory.EUAMM2:
        return CAT_A_MOD2[pageName];
    }
  }

  ionViewDidLeave(): void {
    super.ionViewDidLeave();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
