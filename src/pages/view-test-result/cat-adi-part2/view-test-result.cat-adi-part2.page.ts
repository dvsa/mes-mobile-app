import { Component, OnInit } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform,
  Loading,
  LoadingController,
} from 'ionic-angular';
import { JournalData } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { get } from 'lodash';
import moment from 'moment';

import { BasePageComponent } from '../../../shared/classes/base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { SearchProvider } from '../../../providers/search/search';
import { CompressionProvider } from '../../../providers/compression/compression';
import { formatApplicationReference } from '../../../shared/helpers/formatters';
import { getCandidateName } from '../../../modules/tests/journal-data/common/candidate/candidate.selector';
import { getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { StoreModel } from '../../../shared/models/store.model';
import { ErrorTypes } from '../../../shared/models/error-message';
import { ViewTestResultViewDidEnter } from '../view-test-result.actions';
import { LogType } from '../../../shared/models/log.model';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { QuestionProvider } from '../../../providers/question/question';
import { TestDetailsModel } from '../components/test-details-card/test-details-card.model';
import { ExaminerDetailsModel } from '../components/examiner-details-card/examiner-details-card.model';
import { ViewTestHeaderModel } from '../components/view-test-header/view-test-header.model';

@IonicPage()
@Component({
  selector: '.view-test-result-cat-adi-part2-page',
  templateUrl: 'view-test-result.cat-adi-part2.page.html',
})
export class ViewTestResultCatADIPart2Page extends BasePageComponent implements OnInit {

  applicationReference: string = '';
  testResult: CatADI2UniqueTypes.TestResult;
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
        map(data => this.testResult = this.compressionProvider.extractTestResult(data) as
          CatADI2UniqueTypes.TestResult),
        tap(() => this.handleLoadingUI(false)),
        catchError((err) => {
          this.store$.dispatch(new SaveLog(this.logHelper
            .createLog(LogType.ERROR, `Getting test result for app ref (${this.applicationReference})`,
              err)));
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

  getTrainerData(): CatADI2UniqueTypes.TrainerDetails {
    if (!this.testResult) {
      return null;
    }
    return {
      orditTrainedCandidate: get(this.testResult, 'trainerDetails.orditTrainedCandidate'),
      trainingRecords: get(this.testResult, 'trainerDetails.trainingRecords'),
      trainerRegistrationNumber: get(this.testResult, 'trainerDetails.trainerRegistrationNumber'),
    };
  }

  getCandidateDetails(): { prn: number; attemptNumber: number; } {
    if (!this.testResult) {
      return null;
    }
    return {
      prn: get(this.testResult, 'journalData.candidate.prn'),
      attemptNumber: get(this.testResult, 'journalData.candidate.previousADITests'),
    };
  }

  getTestDetails(): TestDetailsModel {
    if (!this.testResult) {
      return null;
    }

    const startDate: moment.Moment = moment(this.testResult.journalData.testSlotAttributes.start);
    const journalData: JournalData = this.testResult.journalData;

    return {
      date: startDate.format('dddd Do MMMM YYYY'),
      time: startDate.format('HH:mm'),
      applicationReference: formatApplicationReference(journalData.applicationReference),
      category: TestCategory.ADI2,
      specialNeeds: journalData.testSlotAttributes.specialNeedsArray,
      entitlementCheck: journalData.testSlotAttributes.entitlementCheck,
      slotType: journalData.testSlotAttributes.slotType,
      previousCancellations: get(journalData, 'testSlotAttributes.previousCancellation', []),
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
