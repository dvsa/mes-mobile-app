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
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { DateTime } from '../../../shared/helpers/date-time';
import { CompressionProvider } from '../../../providers/compression/compression';
import { formatApplicationReference } from '../../../shared/helpers/formatters';
import { getCandidateName } from '../../../modules/tests/journal-data/candidate/candidate.selector';
import { getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { ErrorTypes } from '../../../shared/models/error-message';
import { ViewTestResultViewDidEnter } from '../view-test-result.actions';
import { LogType } from '../../../shared/models/log.model';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { QuestionProvider } from '../../../providers/question/question';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { HttpResponse } from '@angular/common/http';
import { TestDetailsModel } from '../components/test-details-card/test-details-card.model';
import { ExaminerDetailsModel } from '../components/examiner-details-card/examiner-details-card.model';
import { ViewTestHeaderModel } from '../components/view-test-header/view-test-header.model';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { categoryBETestResultMock } from '../../../shared/mocks/cat-be-test-result.mock';
import { get } from 'lodash';

@IonicPage()
@Component({
  selector: '.view-test-result-cat-c-page',
  templateUrl: 'view-test-result.cat-c.page.html',
})
export class ViewTestResultCatCPage extends BasePageComponent implements OnInit {

  applicationReference: string = '';
  // TODO - Cat C  - Need to type this to Cat C
  testResult: CatBEUniqueTypes.TestResult;

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
        map((response: HttpResponse<any>): string => response.body),
        map(data => this.testResult = this.compressionProvider.extractTestResult(data) as CatBEUniqueTypes.TestResult),
        tap(() => this.handleLoadingUI(false)),
        catchError((err) => {
          this.testResult = categoryBETestResultMock;
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

    const startDate: DateTime = new DateTime(this.testResult.journalData.testSlotAttributes.start);

    return {
      date: startDate.format('dddd Do MMMM YYYY'),
      time: startDate.format('HH:mm'),
      applicationReference: formatApplicationReference(this.testResult.journalData.applicationReference),
      category: TestCategory.C,
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
