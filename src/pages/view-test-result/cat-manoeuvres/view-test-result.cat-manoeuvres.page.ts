import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  Loading,
  LoadingController,
} from 'ionic-angular';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { SearchProvider } from '../../../providers/search/search';
import { tap, catchError, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { TestDetailsModel } from '../components/test-details-card/test-details-card.model';
import { ExaminerDetailsModel } from '../components/examiner-details-card/examiner-details-card.model';
import { CompressionProvider } from '../../../providers/compression/compression';
import { formatApplicationReference } from '../../../shared/helpers/formatters';
import { ViewTestHeaderModel } from '../components/view-test-header/view-test-header.model';
import { getCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { get } from 'lodash';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { ErrorTypes } from '../../../shared/models/error-message';
import { ViewTestResultViewDidEnter } from '../view-test-result.actions';
import { LogType } from '../../../shared/models/log.model';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { QuestionProvider } from '../../../providers/question/question';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { HttpResponse } from '@angular/common/http';
import moment from 'moment';
import { VehicleDetailsModel } from './components/vehicle-details-card/vehicle-details-card.cat-manoeuvres.model';
import { TestResultCatCMSchema } from '@dvsa/mes-test-schema/categories/CM';
import { TestResultCatC1MSchema } from '@dvsa/mes-test-schema/categories/C1M';
import { TestResultCatCEMSchema } from '@dvsa/mes-test-schema/categories/CEM';
import { TestResultCatC1EMSchema } from '@dvsa/mes-test-schema/categories/C1EM';
import { TestResultCatDMSchema } from '@dvsa/mes-test-schema/categories/DM';
import { TestResultCatD1MSchema } from '@dvsa/mes-test-schema/categories/D1M';
import { TestResultCatDEMSchema } from '@dvsa/mes-test-schema/categories/DEM';
import { TestResultCatD1EMSchema } from '@dvsa/mes-test-schema/categories/D1EM';

export type CatManoeuvresTestResultUnion =
  TestResultCatCMSchema |
  TestResultCatC1MSchema |
  TestResultCatCEMSchema |
  TestResultCatC1EMSchema |
  TestResultCatDMSchema |
  TestResultCatD1MSchema |
  TestResultCatDEMSchema |
  TestResultCatD1EMSchema;

@IonicPage()
@Component({
  selector: '.view-test-result-cat-manoeuvres-page',
  templateUrl: 'view-test-result.cat-manoeuvres.page.html',
})
export class ViewTestResultCatManoeuvresPage extends BasePageComponent implements OnInit {

  applicationReference: string = '';
  testResult: CatManoeuvresTestResultUnion;

  isLoading: boolean;
  loadingSpinner: Loading;
  subscription: Subscription;
  showErrorMessage: boolean = false;
  errorLink: string;
  additionalErrorText: boolean;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public authenticationProvider: AuthenticationProvider,
    public searchProvider: SearchProvider,
    public compressionProvider: CompressionProvider,
    private store$: Store<StoreModel>,
    private logHelper: LogHelper,
    public questionProvider: QuestionProvider,
  ) {
    super(platform, navController, authenticationProvider);

    this.applicationReference = navParams.get('applicationReference');
  }

  ngOnInit(): void {
    this.handleLoadingUI(true);

    this.subscription = this.searchProvider
      .getTestResult(this.applicationReference, this.authenticationProvider.getEmployeeId())
      .pipe(
        map((response: HttpResponse<any>) => response.body),
        // tslint:disable-next-line:max-line-length
        map(data => this.testResult = this.compressionProvider.extractTestResult(data) as CatManoeuvresTestResultUnion),
        tap(() => this.handleLoadingUI(false)),
        catchError((err) => {
          this.store$.dispatch(new SaveLog(this.logHelper
            .createLog(LogType.ERROR, `Getting test result for app ref (${this.applicationReference})`, err)));
          this.errorLink = ErrorTypes.SEARCH_RESULT;
          this.additionalErrorText = true;
          this.showErrorMessage = true;
          this.handleLoadingUI(false);
          return of();
        }),
      ).subscribe();
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ionViewDidEnter() {
    this.store$.dispatch(new ViewTestResultViewDidEnter(this.applicationReference));
  }

  handleLoadingUI = (isLoading: boolean): void => {
    this.isLoading = isLoading;

    if (isLoading) {
      this.loadingSpinner = this.loadingController.create({
        dismissOnPageChange: true,
        spinner: 'circles',
      });
      this.loadingSpinner.present();
      return;
    }
    if (this.loadingSpinner) {
      this.loadingSpinner.dismiss();
      this.loadingSpinner = null;
    }
  }

  getTestDetails(): TestDetailsModel {
    if (!this.testResult) {
      return null;
    }

    const startDate: moment.Moment = moment(get(this.testResult, 'journalData.testSlotAttributes.start'));

    return {
      date: startDate.format('dddd Do MMMM YYYY'),
      time: startDate.format('HH:mm'),
      applicationReference: formatApplicationReference(get(this.testResult, 'journalData.applicationReference')),
      category: this.testResult.category as TestCategory,
      specialNeeds: get(this.testResult, 'journalData.testSlotAttributes.specialNeedsArray'),
      entitlementCheck: get(this.testResult, 'journalData.testSlotAttributes.entitlementCheck'),
      slotType: get(this.testResult, 'journalData.testSlotAttributes.slotType'),
      previousCancellations: get(this.testResult, 'journalData.testSlotAttributes.previousCancellation', []),
    };
  }

  getExaminerDetails(): ExaminerDetailsModel {
    if (!this.testResult) {
      return null;
    }

    return {
      staffNumber: get(this.testResult, 'journalData.examiner.staffNumber'),
      costCode: get(this.testResult, 'journalData.testCentre.costCode'),
      testCentreName: get(this.testResult, 'journalData.testCentre.centreName'),
    };
  }

  getVehicleDetails(): VehicleDetailsModel {
    if (!this.testResult) {
      return null;
    }

    return {
      transmission: get(this.testResult, 'vehicleDetails.gearboxCategory'),
    };
  }

  getHeaderDetails(): ViewTestHeaderModel {
    if (!this.testResult) {
      return null;
    }
    return {
      candidateName: getCandidateName(get(this.testResult, 'journalData.candidate')),
      candidateDriverNumber: get(this.testResult, 'journalData.candidate.driverNumber'),
      activityCode: get(this.testResult, 'activityCode'),
      testOutcome: getTestOutcomeText(this.testResult),
    };
  }

  // on exit error modal
  goBack = (): void => {
    this.navController.pop();
  }
}
