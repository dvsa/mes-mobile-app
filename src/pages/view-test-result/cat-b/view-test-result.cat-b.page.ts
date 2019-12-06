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
import { IpadIssue } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TestDetailsModel } from '../components/test-details-card/test-details-card.model';
import { Subscription } from 'rxjs/Subscription';
import { DateTime } from '../../../shared/helpers/date-time';
import { ExaminerDetailsModel } from '../components/examiner-details-card/examiner-details-card.model';
import { VehicleDetailsModel } from './components/vehicle-details-card/vehicle-details-card.model';
import { RekeyDetailsModel } from '../components/rekey-details-card/rekey-details-card.model';
import { RekeyReasonModel } from '../components/rekey-reason-card/rekey-reason-card.model';
import { CompressionProvider } from '../../../providers/compression/compression';
import { formatApplicationReference } from '../../../shared/helpers/formatters';
import { TestSummaryCardModel } from './components/test-summary-card/test-summary-card-model';
import { ViewTestHeaderModel } from '../components/view-test-header/view-test-header.model';
import { getCandidateName } from '../../../modules/tests/journal-data/candidate/candidate.selector';
import { getTestOutcomeText } from '../../../modules/tests/tests.selector';
import { DebriefCardModel } from './components/debrief-card/debrief-card.model';
import {
  manoeuvreTypeLabels,
} from '../../../shared/constants/competencies/catb-manoeuvres';
import { get } from 'lodash';
import { FaultSummary } from '../../../shared/models/fault-marking.model';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { ErrorTypes } from '../../../shared/models/error-message';
import { ViewTestResultViewDidEnter } from '../view-test-result.actions';
import { LogType } from '../../../shared/models/log.model';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { VehicleChecksQuestion } from '../../../providers/question/vehicle-checks-question.model';
import { QuestionProvider } from '../../../providers/question/question';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';
import { FaultCountProvider } from '../../../providers/fault-count/fault-count';
import { FaultSummaryProvider } from '../../../providers/fault-summary/fault-summary';
import { HttpResponse } from '@angular/common/http';

@IonicPage()
@Component({
  selector: '.view-test-result-cat-b-page',
  templateUrl: 'view-test-result.cat-b.page.html',
})
export class ViewTestResultCatBPage extends BasePageComponent implements OnInit {

  applicationReference: string = '';
  // TODO: currently this page is tightly couple to category B,
  // when we introduce B+E we will need to refactor this to
  // use the TestResultCommonSchema interface
  testResult: CatBUniqueTypes.TestResult;

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
    private faultCountProvider: FaultCountProvider,
    private faultSummaryProvider: FaultSummaryProvider,
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
        map(data => this.testResult = this.compressionProvider.extractTestResult(data) as CatBUniqueTypes.TestResult),
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

    const startDate: DateTime = new DateTime(this.testResult.journalData.testSlotAttributes.start);

    return {
      date: startDate.format('dddd Do MMMM YYYY'),
      time: startDate.format('HH:mm'),
      applicationReference: formatApplicationReference(this.testResult.journalData.applicationReference),
      category: this.testResult.category as TestCategory,
      specialNeeds: this.testResult.journalData.testSlotAttributes.specialNeedsArray,
      entitlementCheck: this.testResult.journalData.testSlotAttributes.entitlementCheck,
      slotType: this.testResult.journalData.testSlotAttributes.slotType,
      previousCancellations: this.testResult.journalData.testSlotAttributes.previousCancellation,
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

  getVehicleDetails(): VehicleDetailsModel {
    if (!this.testResult) {
      return null;
    }

    const vehicleInfomation: string[] = [];

    if (get(this.testResult, 'vehicleDetails.dualControls')) {
      vehicleInfomation.push('Dual controls');
    }

    if (get(this.testResult, 'vehicleDetails.schoolCar')) {
      vehicleInfomation.push('School car');
    }

    return {
      transmission: get(this.testResult, 'vehicleDetails.gearboxCategory'),
      registrationNumber: get(this.testResult, 'vehicleDetails.registrationNumber'),
      instructorRegistrationNumber: get(this.testResult, 'instructorDetails.registrationNumber'),
      vehicleDetails: vehicleInfomation,
    };
  }

  getTestSummary(): TestSummaryCardModel {
    if (!this.testResult) {
      return null;
    }

    const accompaniedBy: string[] = [];

    if (get(this.testResult, 'accompaniment.ADI')) {
      accompaniedBy.push('ADI');
    }
    if (get(this.testResult, 'accompaniment.interpreter')) {
      accompaniedBy.push('Interpreter');
    }
    if (get(this.testResult, 'accompaniment.supervisor')) {
      accompaniedBy.push('Supervisor');
    }
    if (get(this.testResult, 'accompaniment.other')) {
      accompaniedBy.push('Other');
    }

    return {
      accompaniment: accompaniedBy,
      provisionalLicenceProvided: get(this.testResult, 'passCompletion.provisionalLicenceProvided'),
      passCertificateNumber: get(this.testResult, 'passCompletion.passCertificateNumber'),
      routeNumber: get(this.testResult, 'testSummary.routeNumber'),
      independentDriving: get(this.testResult, 'testSummary.independentDriving'),
      candidateDescription: get(this.testResult, 'testSummary.candidateDescription'),
      debriefWitnessed: get(this.testResult, 'testSummary.debriefWitnessed'),
      weatherConditions: get(this.testResult, 'testSummary.weatherConditions'),
      D255: get(this.testResult, 'testSummary.D255'),
      additionalInformation: get(this.testResult, 'testSummary.additionalInformation'),
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

  getDebrief(): DebriefCardModel {
    if (!this.testResult) {
      return null;
    }

    return {
      legalRequirements: get(this.testResult, 'testData.testRequirements'),
      manoeuvres: this.getManoeuvres(),
      controlledStop: get(this.testResult, 'testData.controlledStop.selected'),
      ecoControl: get(this.testResult, 'testData.eco.adviceGivenControl'),
      ecoPlanning: get(this.testResult, 'testData.eco.adviceGivenPlanning'),
      eta: this.getETA(),
      showMeQuestion: this.getShowMeQuestion(),
      tellMeQuestion: this.getTellMeQuestion(),
      dangerousFaults: this.getDangerousFaults(),
      seriousFaults: this.getSeriousFaults(),
      drivingFaults: this.getDrivingFaults(),
      drivingFaultCount:this.faultCountProvider.getDrivingFaultSumCount(
        this.testResult.category as TestCategory,
        this.testResult.testData,
      ),
    };
  }

  getManoeuvres(): string[] {
    const manoeuvres = [];

    if (get(this.testResult, 'testData.manoeuvres.forwardPark.selected')) {
      manoeuvres.push(manoeuvreTypeLabels.forwardPark);
    }
    if (get(this.testResult, 'testData.manoeuvres.reverseParkCarpark.selected')) {
      manoeuvres.push(manoeuvreTypeLabels.reverseParkCarpark);
    }
    if (get(this.testResult, 'testData.manoeuvres.reverseParkRoad.selected')) {
      manoeuvres.push(manoeuvreTypeLabels.reverseParkRoad);
    }
    if (get(this.testResult, 'testData.manoeuvres.reverseRight.selected')) {
      manoeuvres.push(manoeuvreTypeLabels.reverseRight);
    }

    if (manoeuvres.length === 0) {
      manoeuvres.push('None');
    }

    return manoeuvres;
  }

  getETA(): string[] {
    const eta: string[] = [];

    if (get(this.testResult, 'testData.ETA.physical')) {
      eta.push('Physical');
    }
    if (get(this.testResult, 'testData.ETA.verbal')) {
      eta.push('Verbal');
    }
    if (eta.length === 0) {
      eta.push('None');
    }
    return eta;
  }

  getShowMeQuestion(): VehicleChecksQuestion {
    const showMeQuestionCode = get(this.testResult, 'testData.vehicleChecks.showMeQuestion.code');
    return this.questionProvider
      .getShowMeQuestions(this.testResult.category as TestCategory)
      .find(question => question.code === showMeQuestionCode);
  }

  getTellMeQuestion(): VehicleChecksQuestion {
    const tellMeQuestionCode = get(this.testResult, 'testData.vehicleChecks.tellMeQuestion.code');
    return this.questionProvider
    .getTellMeQuestions(this.testResult.category as TestCategory)
    .find(question => question.code === tellMeQuestionCode);
  }

  getDangerousFaults(): FaultSummary[] {
    const testData: CatBUniqueTypes.TestData = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getDangerousFaultsList(testData, TestCategory.B);
  }

  getSeriousFaults(): FaultSummary[] {
    const testData: CatBUniqueTypes.TestData = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getSeriousFaultsList(testData, TestCategory.B);
  }

  getDrivingFaults(): FaultSummary[] {
    const testData: CatBUniqueTypes.TestData = get(this.testResult, 'testData');
    return this.faultSummaryProvider.getDrivingFaultsList(testData, TestCategory.B);
  }

  getRekeyDetails(): RekeyDetailsModel {
    if (!this.testResult || !this.testResult.rekey) {
      return null;
    }

    const testDate: DateTime = new DateTime(this.testResult.journalData.testSlotAttributes.start);
    const rekeyDate: DateTime = new DateTime(this.testResult.rekeyDate);

    return {
      scheduledStaffNumber: this.testResult.examinerBooked,
      conductedStaffNumber: this.testResult.examinerConducted,
      testDate: testDate.format('dddd Do MMMM YYYY'),
      rekeyedStaffNumber: this.testResult.examinerKeyed,
      rekeyDate: rekeyDate.format('dddd Do MMMM YYYY'),
    };
  }

  getRekeyReason(): RekeyReasonModel {
    if (!this.testResult || !this.testResult.rekey) {
      return null;
    }

    const isIpadIssueSelected:boolean = get(this.testResult, 'rekeyReason.ipadIssue.selected', false);
    const isTransferSelected: boolean = get(this.testResult, 'rekeyReason.transfer.selected', false);
    const isOtherSelected: boolean = get(this.testResult, 'rekeyReason.other.selected', false);

    const getIpadIssueDisplayText = (reasonType: IpadIssue): string => {

      let value = '';

      if (reasonType.broken) {
        value = 'Broken';
      }

      if (reasonType.lost) {
        value = 'Lost';
      }

      if (reasonType.technicalFault) {
        value = 'Technical fault';
      }

      if (reasonType.stolen) {
        value = 'Stolen';
      }

      return value;
    };

    return {
      ipadIssue: isIpadIssueSelected ? getIpadIssueDisplayText(get(this.testResult, 'rekeyReason.ipadIssue')) : 'None',
      transfer: isTransferSelected ? 'Yes' : 'No',
      other: isOtherSelected ? get(this.testResult, 'rekeyReason.other.reason') : 'N/A',
    };
  }

  // on exit error modal
  goBack = (): void => {
    this.navController.pop();
  }
}
