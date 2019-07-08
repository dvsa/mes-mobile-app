import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, LoadingControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { ViewTestResultPage } from '../view-test-result';
import { SearchProvider } from '../../../providers/search/search';
import { SearchProviderMock } from '../../../providers/search/__mocks__/search.mock';
import { MockComponent } from 'ng-mocks';
import { TestDetailsCardComponent } from '../components/test-details-card/test-details-card';
import { ExaminerDetailsCardComponent } from '../components/examiner-details-card/examiner-details';
import { By } from '@angular/platform-browser';
import { ExaminerDetailsModel } from '../components/examiner-details-card/examiner-details-card.model';
import { TestDetailsModel } from '../components/test-details-card/test-details-card.model';
import { VehicleDetailsModel } from '../components/vehicle-details-card/vehicle-details-card.model';
import { VehicleDetailsCardComponent } from '../components/vehicle-details-card/vehicle-details-card';
import { categoryBTestResultMock } from '../../../shared/mocks/cat-b-test-result.mock';
import { CompressionProvider } from '../../../providers/compression/compression';
import { CompressionProviderMock } from '../../../providers/compression/__mocks__/compression.mock';

describe('ViewTestResultPage', () => {
  let fixture: ComponentFixture<ViewTestResultPage>;
  let component: ViewTestResultPage;
  let loadingController: LoadingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewTestResultPage,
        MockComponent(TestDetailsCardComponent),
        MockComponent(ExaminerDetailsCardComponent),
        MockComponent(VehicleDetailsCardComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: SearchProvider, useClass:  SearchProviderMock },
        { provide: CompressionProvider, useClass: CompressionProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ViewTestResultPage);
        component = fixture.componentInstance;
        loadingController = TestBed.get(LoadingController);
      });
  }));

  describe('Class', () => {
    describe('handleLoadingUI', () => {
      it('should setup a loading spinner when isLoading is set to true', () => {
        component.handleLoadingUI(true);

        expect(component.isLoading).toBeTruthy();
        expect(component.loadingSpinner).not.toBeNull;
      });
      it('should remove the loading spinner when isLoading is set to false', () => {
        component.loadingSpinner = loadingController.create();

        component.handleLoadingUI(false);

        expect(component.isLoading).toBeFalsy();
        expect(component.loadingSpinner).toBeNull();
      });
    });
    describe('getTestDetails', () => {
      it('should correctly generate the data', () => {
        component.testResult = categoryBTestResultMock;

        const result: TestDetailsModel = component.getTestDetails();

        expect(result.applicationReference).toBe(1234);
        expect(result.category).toBe('B');
        expect(result.date).toBe('Friday 5th July 2019');
        expect(result.time).toBe('09:00');
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

        expect(result.transmission).toBe('Manual');
        expect(result.registrationNumber).toBe('mock-vehicle-registration-number');
        expect(result.instructorRegistrationNumber).toBe(1);
      });
      it('should return null when there is no test result', () => {
        const result: VehicleDetailsModel = component.getVehicleDetails();
        expect(result).toBeNull();
      });
    });

  });

  describe('DOM', () => {
    it('should hide the cards when the data is loading', () => {
      component.isLoading = true;

      expect(fixture.debugElement.query(By.css('test-details-card'))).toBeNull();
      expect(fixture.debugElement.query(By.css('examiner-details-card'))).toBeNull();
      expect(fixture.debugElement.query(By.css('vehicle-details-card'))).toBeNull();
    });
    it('should show the cards when the data is not loading', () => {
      component.isLoading = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('test-details-card'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('examiner-details-card'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('vehicle-details-card'))).not.toBeNull();
    });
  });
});
