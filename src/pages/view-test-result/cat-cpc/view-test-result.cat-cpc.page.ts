import { BasePageComponent } from '../../../shared/classes/base-page';
import { Component, OnInit } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { of, Subscription } from 'rxjs';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { QuestionProvider } from '../../../providers/question/question';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogType } from '../../../shared/models/log.model';
import { ErrorTypes } from '../../../shared/models/error-message';
import { ViewTestResultViewDidEnter } from '../view-test-result.actions';
import { TestDetailsModel } from '../components/test-details-card/test-details-card.model';
import moment from 'moment';
import { formatApplicationReference } from '../../../shared/helpers/formatters';
import { ExaminerDetailsModel } from '../components/examiner-details-card/examiner-details-card.model';
import { ViewTestHeaderModel } from '../components/view-test-header/view-test-header.model';
import { getCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { get } from 'lodash';
import { TestResultCatCPCSchema } from '@dvsa/mes-test-schema/categories/CPC';
import { TestOutcome } from '../../../modules/tests/tests.constants';

@IonicPage()
@Component({
  selector: 'view-test-result-cat-cpc-page',
  templateUrl: 'view-test-result.cat-cpc.page.html',
})
export class ViewTestResultCatCPCPage extends BasePageComponent implements OnInit {

  applicationReference: string = '';
  testResult: TestResultCatCPCSchema;
  testCategory: TestCategory;
  isLoading: boolean;
  loadingSpinner: Loading;
  subscription: Subscription;
  showErrorMessage: boolean = false;
  errorLink: string;
  additionalErrorText: boolean;
  testOutcome: TestOutcome;

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
        map((response: HttpResponse<any>): string => response.body),
        map(data => this.testResult = this.compressionProvider.extractTestResult(data) as TestResultCatCPCSchema),
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
      ).subscribe((data) => {
        this.testCategory = this.testResult.category as TestCategory;
        this.testOutcome = getTestOutcomeText(this.testResult);
      });
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

    const startDate: moment.Moment = moment(this.testResult.journalData.testSlotAttributes.start);

    return {
      date: startDate.format('dddd Do MMMM YYYY'),
      time: startDate.format('HH:mm'),
      applicationReference: formatApplicationReference(this.testResult.journalData.applicationReference),
      category: this.testResult.category as TestCategory,
      specialNeeds: this.testResult.journalData.testSlotAttributes.specialNeedsArray,
      entitlementCheck: this.testResult.journalData.testSlotAttributes.entitlementCheck,
      slotType: this.testResult.journalData.testSlotAttributes.slotType,
      previousCancellations: get(this.testResult, 'journalData.testSlotAttributes.previousCancellation', []),
    };
  }

  getExaminerDetails(): ExaminerDetailsModel {
    if (!this.testResult) {
      return null;
    }

    return {
      staffNumber: this.testResult.journalData.examiner.staffNumber,
      costCode: this.testResult.journalData.testCentre.costCode,
      testCentreName: this.testResult.journalData.testCentre.centreName,
    };
  }

  getHeaderDetails(): ViewTestHeaderModel {
    if (!this.testResult) {
      return null;
    }
    return {
      candidateName: getCandidateName(this.testResult.journalData.candidate),
      candidateDriverNumber: this.testResult.journalData.candidate.driverNumber,
      activityCode: this.testResult.activityCode,
      testOutcome: getTestOutcomeText(this.testResult),
    };
  }

  // on exit error modal
  goBack = (): void => {
    this.navController.pop();
  }
}
