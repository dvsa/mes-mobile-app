import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SearchProvider } from '../../providers/search/search';
import { StandardCarTestCATBSchema, ApplicationReference } from '@dvsa/mes-test-schema/categories/B';
import { tap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TestDetailsModel } from './components/test-details-card/test-details-card.model';
import { Subscription } from 'rxjs/Subscription';
import { DateTime } from '../../shared/helpers/date-time';
import { ExaminerDetailsModel } from './components/examiner-details-card/examiner-details-card.model';
import { VehicleDetailsModel } from './components/vehicle-details-card/vehicle-details-card.model';
import { CompressionProvider } from '../../providers/compression/compression';

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

    const applicationReference: ApplicationReference =  this.testResult.journalData.applicationReference;
    const applicationReferenceString: string =
      `${applicationReference.applicationId}${applicationReference.bookingSequence}${applicationReference.checkDigit}`;

    const startDate: DateTime = new DateTime(this.testResult.journalData.testSlotAttributes.start);

    return {
      date: startDate.format('dddd Do MMMM YYYY'),
      time: startDate.format('HH:mm'),
      applicationReference: applicationReferenceString,
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
}
