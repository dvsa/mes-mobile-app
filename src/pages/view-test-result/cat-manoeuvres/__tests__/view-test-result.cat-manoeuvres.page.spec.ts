import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import {
  IonicModule,
  NavController,
  NavParams,
  Platform,
  LoadingController,
} from 'ionic-angular';
import {
  NavControllerMock,
  NavParamsMock,
  PlatformMock,
  LoadingControllerMock,
} from 'ionic-mocks';
import { AppModule } from '../../../../app/app.module';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { SearchProvider } from '../../../../providers/search/search';
import { SearchProviderMock } from '../../../../providers/search/__mocks__/search.mock';
import { MockComponent } from 'ng-mocks';
import { TestDetailsCardComponent } from '../../components/test-details-card/test-details-card';
import { RekeyDetailsCardComponent } from '../../components/rekey-details-card/rekey-details';
import { RekeyReasonCardComponent } from '../../components/rekey-reason-card/rekey-reason';
import { ExaminerDetailsCardComponent } from '../../components/examiner-details-card/examiner-details';
import { By } from '@angular/platform-browser';
import { ExaminerDetailsModel } from '../../components/examiner-details-card/examiner-details-card.model';
import { TestDetailsModel } from '../../components/test-details-card/test-details-card.model';
import { categoryBTestResultMock } from '../../../../shared/mocks/cat-b-test-result.mock';
import { CompressionProvider } from '../../../../providers/compression/compression';
import { CompressionProviderMock } from '../../../../providers/compression/__mocks__/compression.mock';
import { ViewTestHeaderComponent } from '../../components/view-test-header/view-test-header';
import { ViewTestHeaderModel } from '../../components/view-test-header/view-test-header.model';
import { TestOutcome } from '../../../../modules/tests/tests.constants';
import { ErrorMessageComponent } from '../../../../components/common/error-message/error-message';
import { ContactDetailsCardComponent } from '../../components/contact-details-card/contact-details-card';
import { configureTestSuite } from 'ng-bullet';
import { ViewTestResultCatManoeuvresPage } from '../view-test-result.cat-manoeuvres.page';
import { VehicleDetailsModel } from '../components/vehicle-details-card/vehicle-details-card.cat-manoeuvres.model';
import {
  VehicleDetailsCardCatManoeuvresComponent,
} from '../components/vehicle-details-card/vehicle-details-card.cat-manoeuvres';
import { TestSummaryCardCatManoeuvreComponent } from '../components/test-summary-card/test-summary-card';
import { DebriefCardManoeuvreComponent } from '../components/debrief-card/debrief-card';
import { BusinessDetailsCardComponent } from '../../components/business-details-card/business-details-card';

describe('ViewTestResultCatManoeuvresPage', () => {
  let fixture: ComponentFixture<ViewTestResultCatManoeuvresPage>;
  let component: ViewTestResultCatManoeuvresPage;
  let loadingController: LoadingController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewTestResultCatManoeuvresPage,
        MockComponent(TestDetailsCardComponent),
        MockComponent(RekeyDetailsCardComponent),
        MockComponent(RekeyReasonCardComponent),
        MockComponent(ExaminerDetailsCardComponent),
        MockComponent(DebriefCardManoeuvreComponent),
        MockComponent(ViewTestHeaderComponent),
        MockComponent(ErrorMessageComponent),
        MockComponent(ContactDetailsCardComponent),
        MockComponent(VehicleDetailsCardCatManoeuvresComponent),
        MockComponent(TestSummaryCardCatManoeuvreComponent),
        MockComponent(BusinessDetailsCardComponent),
      ],
      imports: [IonicModule, AppModule],
      providers: [
        {
          provide: NavController,
          useFactory: () => NavControllerMock.instance(),
        },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        {
          provide: LoadingController,
          useFactory: () => LoadingControllerMock.instance(),
        },
        {
          provide: AuthenticationProvider,
          useClass: AuthenticationProviderMock,
        },
        { provide: SearchProvider, useClass: SearchProviderMock },
        { provide: CompressionProvider, useClass: CompressionProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewTestResultCatManoeuvresPage);
    component = fixture.componentInstance;
    loadingController = TestBed.get(LoadingController);
  }));

  describe('Class', () => {
    describe('handleLoadingUI', () => {
      it('should setup a loading spinner when isLoading is set to true', () => {
        component.handleLoadingUI(true);

        expect(component.isLoading).toEqual(true);
        expect(component.loadingSpinner).not.toBeNull;
      });
      it('should remove the loading spinner when isLoading is set to false', () => {
        component.loadingSpinner = loadingController.create();

        component.handleLoadingUI(false);

        expect(component.isLoading).toEqual(false);
        expect(component.loadingSpinner).toBeNull();
      });
    });
    describe('getTestDetails', () => {
      it('should correctly generate the data', () => {
        component.testResult = categoryBTestResultMock;

        const result: TestDetailsModel = component.getTestDetails();

        expect(result.applicationReference).toBe('1234');
        expect(result.category).toBe('B');
        expect(result.date).toBe('Friday 5th July 2019');
        expect(result.time).toBe('09:00');
        expect(result.specialNeeds).toEqual(['special need 1', 'special need 2']);
        expect(result.entitlementCheck).toBe(true);
        expect(result.slotType).toBe('slot-type-mock');
        expect(result.previousCancellations).toEqual(['Act of nature', 'DSA']);
      });
      it('should return null when there is no test result', () => {
        const result: TestDetailsModel = component.getTestDetails();
        expect(result).toBeNull();
      });
    });
    describe('getExaminerDetails', () => {
      it('should correctly generate the data', () => {
        component.testResult = categoryBTestResultMock;

        const result: ExaminerDetailsModel = component.getExaminerDetails();

        expect(result.staffNumber).toBe('mock-staff-number');
        expect(result.costCode).toBe('mock-cost-code');
        expect(result.testCentreName).toBe('mock-centre-name');
      });
      it('should return null when there is no test result', () => {
        const result: ExaminerDetailsModel = component.getExaminerDetails();
        expect(result).toBeNull();
      });
    });
    describe('getVehicleDetails', () => {
      it('should correctly generate the data', () => {
        component.testResult = categoryBTestResultMock;

        const result: VehicleDetailsModel = component.getVehicleDetails();

        expect(result.vehicleRegistration).toBe('mock-vehicle-registration-number');
      });
      it('should return null when there is no test result', () => {
        const result: VehicleDetailsModel = component.getVehicleDetails();
        expect(result).toBeNull();
      });
    });
    describe('getHeaderDetails', () => {
      it('should return the correct data', () => {
        component.testResult = categoryBTestResultMock;
        const result: ViewTestHeaderModel = component.getHeaderDetails();

        expect(result.activityCode).toBe('2');
        expect(result.candidateName).toBe('Miss Doris Pearson');
        expect(result.candidateDriverNumber).toBe('mock-driver-number');
        expect(result.testOutcome).toBe(TestOutcome.Failed);
      });
      it('should return null when there is no test result', () => {
        const result: ViewTestHeaderModel = component.getHeaderDetails();
        expect(result).toBeNull();
      });
    });

    describe('goBack', () => {
      it('should navigation the user back to the last page', () => {
        component.goBack();
        expect(component.navController.pop).toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {
    it('should hide the cards and error message when the data is loading', () => {
      component.isLoading = true;

      expect(fixture.debugElement.query(By.css('.error'))).toBeNull();

      expect(fixture.debugElement.query(By.css('view-test-header'))).toBeNull();
      expect(
        fixture.debugElement.query(By.css('test-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('rekey-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('rekey-reason-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('examiner-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('vehicle-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('test-summary-card')),
      ).toBeNull();
    });
    it('should hide the cards and show the error message when there has been an error', () => {
      component.isLoading = false;
      component.showErrorMessage = true;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.error'))).not.toBeNull();

      expect(fixture.debugElement.query(By.css('view-test-header'))).toBeNull();
      expect(
        fixture.debugElement.query(By.css('test-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('rekey-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('rekey-reason-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('examiner-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('vehicle-details-cat-manoeuvres-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('test-summary-card')),
      ).toBeNull();
    });

    it('should show the cards when the data is not loading and there is no error', () => {
      component.isLoading = false;
      component.testResult = categoryBTestResultMock;

      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.error'))).toBeNull();

      expect(
        fixture.debugElement.query(By.css('view-test-header')),
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('test-details-card')),
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('rekey-details-card')),
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('rekey-reason-card')),
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('examiner-details-card')),
      ).not.toBeNull();
    });
  });

  it('should show rekey cards only when rekey is true', () => {
    component.isLoading = false;
    component.testResult = categoryBTestResultMock;

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('rekey-details-card')),
    ).not.toBeNull();
    expect(
      fixture.debugElement.query(By.css('rekey-reason-card')),
    ).not.toBeNull();
  });
});
