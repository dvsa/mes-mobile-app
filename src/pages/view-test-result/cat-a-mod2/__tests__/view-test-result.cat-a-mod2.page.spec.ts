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
import { categoryAM2TestResultMock } from '../../../../shared/mocks/cat-a-mod2-test-result.mock';
import { CompressionProvider } from '../../../../providers/compression/compression';
import { CompressionProviderMock } from '../../../../providers/compression/__mocks__/compression.mock';
import { TestSummaryCardComponent } from '../../components/test-summary-card/test-summary-card';
import { ViewTestHeaderComponent } from '../../components/view-test-header/view-test-header';
import { ViewTestHeaderModel } from '../../components/view-test-header/view-test-header.model';
import { TestOutcome } from '../../../../modules/tests/tests.constants';
import { DebriefCardComponent } from '../components/debrief-card/debrief-card';
import { ErrorMessageComponent } from '../../../../components/common/error-message/error-message';
import { BusinessDetailsCardComponent } from '../../components/business-details-card/business-details-card';
import { ContactDetailsCardComponent } from '../../components/contact-details-card/contact-details-card';
import { ViewTestResultCatAMod2Page } from '../view-test-result.cat-a-mod2.page';
import { configureTestSuite } from 'ng-bullet';
import { VehicleDetailsCardCatAComponent } from
'../../components/vehicle-details-card-cat-a/vehicle-details-card-cat-a';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('ViewTestResultCatAMod2Page', () => {
  let fixture: ComponentFixture<ViewTestResultCatAMod2Page>;
  let component: ViewTestResultCatAMod2Page;
  let loadingController: LoadingController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewTestResultCatAMod2Page,
        MockComponent(TestDetailsCardComponent),
        MockComponent(RekeyDetailsCardComponent),
        MockComponent(RekeyReasonCardComponent),
        MockComponent(ExaminerDetailsCardComponent),
        MockComponent(TestSummaryCardComponent),
        MockComponent(ViewTestHeaderComponent),
        MockComponent(DebriefCardComponent),
        MockComponent(ErrorMessageComponent),
        MockComponent(BusinessDetailsCardComponent),
        MockComponent(ContactDetailsCardComponent),
        MockComponent(VehicleDetailsCardCatAComponent),
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
    fixture = TestBed.createComponent(ViewTestResultCatAMod2Page);
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
        component.testResult = categoryAM2TestResultMock;

        const result: TestDetailsModel = component.getTestDetails();

        expect(result.applicationReference).toBe('10123433011');
        expect(result.category).toBe('EUAM2');
        expect(result.date).toBe('Thursday 5th March 2020');
        expect(result.time).toBe('10:40');
        expect(result.entitlementCheck).toBe(false);
        expect(result.slotType).toBe('Standard Test');
        expect(result.previousCancellations).toEqual(['Act of nature']);
      });
      it('should return null when there is no test result', () => {
        const result: TestDetailsModel = component.getTestDetails();
        expect(result).toBeNull();
      });
    });
    describe('getExaminerDetails', () => {
      it('should correctly generate the data', () => {
        component.testResult = categoryAM2TestResultMock;

        const result: ExaminerDetailsModel = component.getExaminerDetails();

        expect(result.staffNumber).toBe('10000000');
        expect(result.costCode).toBe('EXTC1');
        expect(result.testCentreName).toBe('Example Test Centre');
      });
      it('should return null when there is no test result', () => {
        const result: ExaminerDetailsModel = component.getExaminerDetails();
        expect(result).toBeNull();
      });
    });
    describe('getHeaderDetails', () => {
      it('should return the correct data', () => {
        component.testResult = categoryAM2TestResultMock;
        const result: ViewTestHeaderModel = component.getHeaderDetails();

        expect(result.activityCode).toBe('1');
        expect(result.candidateName).toBe('Dr Fox Farrell');
        expect(result.candidateDriverNumber).toBe('CATA123456789DO4');
        expect(result.testOutcome).toBe(TestOutcome.Passed);
      });
      it('should return null when there is no test result', () => {
        const result: ViewTestHeaderModel = component.getHeaderDetails();
        expect(result).toBeNull();
      });
    });
    describe('getDriverType', () => {
      it('should return riding when cat is a', () => {
        component.testResult.category = TestCategory.EUA1M1;
        expect(component.getDriverType()).toEqual('riding');
      });
      it('should return riding when cat is not a', () => {
        component.testResult.category = TestCategory.B;
        expect(component.getDriverType()).toEqual('driving');
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
        fixture.debugElement.query(By.css('vehicle-details-card-cat-a')),
      ).toBeNull();
      expect(fixture.debugElement.query(By.css('debrief-card'))).toBeNull();
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
        fixture.debugElement.query(By.css('vehicle-details-card-cat-a')),
      ).toBeNull();
      expect(fixture.debugElement.query(By.css('debrief-card'))).toBeNull();
      expect(
        fixture.debugElement.query(By.css('test-summary-card')),
      ).toBeNull();
    });
    it('should show the cards when the data is not loading and there is no error', () => {
      component.isLoading = false;
      component.testResult = categoryAM2TestResultMock;

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
      expect(
        fixture.debugElement.query(By.css('vehicle-details-card-cat-a')),
      ).not.toBeNull();
      expect(fixture.debugElement.query(By.css('debrief-card'))).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('test-summary-card')),
      ).not.toBeNull();
    });
  });
  it('should show rekey cards only when rekey is true', () => {
    component.isLoading = false;
    component.testResult = categoryAM2TestResultMock;

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('rekey-details-card')),
    ).not.toBeNull();
    expect(
      fixture.debugElement.query(By.css('rekey-reason-card')),
    ).not.toBeNull();
  });
});
