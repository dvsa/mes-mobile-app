import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchProvider } from '../../providers/search/search';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
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

@IonicPage()
@Component({
  selector: 'page-view-test-result',
  templateUrl: 'view-test-result.html',
})
export class ViewTestResultPage extends BasePageComponent implements OnInit, OnDestroy {

  applicationReference: string = '';

  testResult: StandardCarTestCATBSchema;

  isLoading: boolean;
  loadingSpinner: Loading;
  subscription: Subscription;

  constructor(
    public navController: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public authenticationProvider: AuthenticationProvider,
    public searchProvider: SearchProvider,
    public compressionProvider: CompressionProvider,

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
          console.log('ERROR', JSON.stringify(error));
          return of();
        }),
      ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      transmission: this.testResult.vehicleDetails.gearboxCategory,
      registrationNumber: this.testResult.vehicleDetails.registrationNumber,
      instructorRegistrationNumber: this.testResult.instructorDetails.registrationNumber,
    };
  }

  getTestSummary(): TestSummaryCardModel {
    if (!this.testResult) {
      return null;
    }

    const accompaniedBy: string[] = [];

    if (this.testResult.accompaniment.ADI) {
      accompaniedBy.push('ADI');
    }
    if (this.testResult.accompaniment.interpreter) {
      accompaniedBy.push('Interpreter');
    }
    if (this.testResult.accompaniment.supervisor) {
      accompaniedBy.push('Supervisor');
    }
    if (this.testResult.accompaniment.other) {
      accompaniedBy.push('Other');
    }

    return {
      accompaniment: accompaniedBy,
      provisionalLicenceProvided: this.testResult.passCompletion.provisionalLicenceProvided,
      passCertificateNumber: this.testResult.passCompletion.passCertificateNumber,
      routeNumber: this.testResult.testSummary.routeNumber,
      independentDriving: this.testResult.testSummary.independentDriving,
      candidateDescription: this.testResult.testSummary.candidateDescription,
      debriefWitnessed: this.testResult.testSummary.debriefWitnessed,
      weatherConditions: this.testResult.testSummary.weatherConditions,
      D255: this.testResult.testSummary.D255,
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
}
