import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchProvider } from '../../providers/search/search';
import { StandardCarTestCATBSchema, TestData } from '@dvsa/mes-test-schema/categories/B';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TestDetailsModel } from './components/test-details-card/test-details-card.model';
import { Subscription } from 'rxjs/Subscription';
import { DateTime } from '../../shared/helpers/date-time';
import { ExaminerDetailsModel } from './components/examiner-details-card/examiner-details-card.model';
import { VehicleDetailsModel } from './components/vehicle-details-card/vehicle-details-card.model';
import { CompressionProvider } from '../../providers/compression/compression';
import { formatApplicationReference } from '../../shared/helpers/formatters';
import { TestSummaryCardModel } from './components/test-summary-card/test-summary-card-model';
import { ViewTestHeaderModel } from './components/view-test-header/view-test-header.model';
import { getCandidateName } from '../../modules/tests/candidate/candidate.selector';
import { getTestOutcomeText } from '../../modules/tests/tests.selector';
import { DebriefCardModel } from './components/debrief-card/debrief-card.model';
import { manoeuvreTypeLabels } from '../test-report/components/manoeuvre-competency/manoeuvre-competency.constants';
import { get } from 'lodash';
import { ShowMeQuestion } from '../../providers/question/show-me-question.model';
import showMeQuestionConstants from '../../providers/question/show-me-question.constants';
import { TellMeQuestion } from '../../providers/question/tell-me-question.model';
import tellMeQuestionConstants from '../../providers/question/tell-me-question.constants';
import { CommentedCompetency, MultiFaultAssignableCompetency } from '../../shared/models/fault-marking.model';
import {
  getManoeuvreFaults,
  getVehicleCheckSeriousFaults,
  getSeriousFaults,
  getDangerousFaults,
  getVehicleCheckDangerousFaults,
  getDrivingFaults,
  getVehicleCheckDrivingFaults,
  getControlledStopFaultAndComment,
} from '../debrief/debrief.selector';
import { CompetencyOutcome } from '../../shared/models/competency-outcome';
import { getDrivingFaultSummaryCount } from '../../modules/tests/test-data/test-data.selector';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { ViewTestResultViewDidEnter } from './view-test-result.actions';

@IonicPage()
@Component({
  selector: 'page-view-test-result',
  templateUrl: 'view-test-result.html',
})
export class ViewTestResultPage extends BasePageComponent implements OnInit {

  applicationReference: string = '';

  testResult: StandardCarTestCATBSchema;

  isLoading: boolean;
  loadingSpinner: Loading;
  subscription: Subscription;
  showErrorMessage: boolean = false;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public authenticationProvider: AuthenticationProvider,
    public searchProvider: SearchProvider,
    public compressionProvider: CompressionProvider,
    private store$: Store<StoreModel>,

  ) {
    super(platform, navController, authenticationProvider);

    this.applicationReference = navParams.get('applicationReference');

  }

  ngOnInit(): void {
    this.handleLoadingUI(true);

    this.subscription = this.searchProvider
      .getTestResult(this.applicationReference, this.authenticationProvider.getEmployeeId())
      .pipe(
        map(data => this.testResult = this.compressionProvider.extractCatBTestResult(data)),
        tap(() => this.handleLoadingUI(false)),
        catchError((error) => {
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
    this.store$.dispatch(new ViewTestResultViewDidEnter());
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
      category: this.testResult.category,
    };
  }

  getExaminerDetails(): ExaminerDetailsModel {
    if (!this.testResult) {
      return null;
    }

    return {
      staffNumber: this.testResult.journalData.examiner.staffNumber,
      costCode: this.testResult.journalData.testCentre.costCode,
    };
  }

  getVehicleDetails(): VehicleDetailsModel {
    if (!this.testResult) {
      return null;
    }
    return {
      transmission: get(this.testResult, 'vehicleDetails.gearboxCategory'),
      registrationNumber: get(this.testResult, 'vehicleDetails.registrationNumber'),
      instructorRegistrationNumber: get(this.testResult, 'instructorDetails.registrationNumber'),
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
      drivingFaultCount: getDrivingFaultSummaryCount(this.testResult.testData),
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

  getShowMeQuestion(): ShowMeQuestion {
    const showMeQuestionCode = get(this.testResult, 'testData.vehicleChecks.showMeQuestion.code');
    return showMeQuestionConstants.find(question => question.code === showMeQuestionCode);
  }

  getTellMeQuestion(): TellMeQuestion {
    const tellMeQuestionCode = get(this.testResult, 'testData.vehicleChecks.tellMeQuestion.code');
    return tellMeQuestionConstants.find(question => question.code === tellMeQuestionCode);
  }

  getDangerousFaults(): (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const testData: TestData = get(this.testResult, 'testData');
    return [
      ...getDangerousFaults(testData.dangerousFaults),
      ...getManoeuvreFaults(testData.manoeuvres, CompetencyOutcome.D),
      ...this.getControlledStopFault(CompetencyOutcome.D),
      ...getVehicleCheckDangerousFaults(testData.vehicleChecks).map(result => this.updateVehicleChecksLabel(result)),
    ];
  }

  getSeriousFaults(): (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const testData: TestData = get(this.testResult, 'testData');
    return [
      ...getSeriousFaults(testData.seriousFaults),
      ...getManoeuvreFaults(testData.manoeuvres, CompetencyOutcome.S),
      ...this.getControlledStopFault(CompetencyOutcome.S),
      ...getVehicleCheckSeriousFaults(testData.vehicleChecks).map(result => this.updateVehicleChecksLabel(result)),
    ];
  }

  getDrivingFaults(): (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const testData: TestData = get(this.testResult, 'testData');
    return [
      ...getDrivingFaults(testData.drivingFaults),
      ...getManoeuvreFaults(testData.manoeuvres, CompetencyOutcome.DF),
      ...this.getControlledStopFault(CompetencyOutcome.DF),
      ...getVehicleCheckDrivingFaults(testData.vehicleChecks).map(result => this.updateVehicleChecksLabel(result)),
    ];
  }

  getControlledStopFault(competencyOutcome: CompetencyOutcome):
    (CommentedCompetency & MultiFaultAssignableCompetency)[] {
    const testData: TestData = get(this.testResult, 'testData');

    return getControlledStopFaultAndComment(testData.controlledStop, competencyOutcome)
      .map((result) => {
        return {
          faultCount: 1,
          competencyDisplayName: result.competencyDisplayName,
          competencyIdentifier: result.competencyIdentifier,
          source: result.source,
          comment: result.comment,
        };
      });
  }

  updateVehicleChecksLabel(vehicleCheck: CommentedCompetency & MultiFaultAssignableCompetency)
    : (CommentedCompetency & MultiFaultAssignableCompetency) {
    return {
      faultCount: vehicleCheck.faultCount,
      competencyDisplayName: 'Vehicle checks',
      competencyIdentifier: vehicleCheck.competencyIdentifier,
      source: vehicleCheck.source,
      comment: vehicleCheck.comment,
    };
  }
}
