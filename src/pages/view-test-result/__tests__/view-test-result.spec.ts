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
import { TestSummaryCardModel } from '../components/test-summary-card/test-summary-card-model';
import { TestSummaryCardComponent } from '../components/test-summary-card/test-summary-card';
import { ViewTestHeaderComponent } from '../components/view-test-header/view-test-header';
import { ViewTestHeaderModel } from '../components/view-test-header/view-test-header.model';
import { TestOutcome } from '../../../modules/tests/tests.constants';
import { DebriefCardComponent } from '../components/debrief-card/debrief-card';
import { manoeuvreTypeLabels } from '../../test-report/components/manoeuvre-competency/manoeuvre-competency.constants';
import { DebriefCardModel } from '../components/debrief-card/debrief-card.model';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { ErrorMessageComponent } from '../../../components/common/error-message/error-message';

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
        MockComponent(TestSummaryCardComponent),
        MockComponent(ViewTestHeaderComponent),
        MockComponent(DebriefCardComponent),
        MockComponent(ErrorMessageComponent),
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

        expect(result.transmission).toBe('Manual');
        expect(result.registrationNumber).toBe(
          'mock-vehicle-registration-number',
        );
        expect(result.instructorRegistrationNumber).toBe(1);
      });
      it('should return null when there is no test result', () => {
        const result: VehicleDetailsModel = component.getVehicleDetails();
        expect(result).toBeNull();
      });
    });
    describe('getTestSummary', () => {
      it('should return the correct data', () => {
        component.testResult = categoryBTestResultMock;
        const result: TestSummaryCardModel = component.getTestSummary();
        expect(result.D255).toEqual(false);
        expect(result.accompaniment).toEqual(['ADI', 'Interpreter']);
        expect(result.candidateDescription).toBe('mock-candidate-description');
        expect(result.debriefWitnessed).toBe(true);
        expect(result.independentDriving).toBe('Sat nav');
        expect(result.passCertificateNumber).toBe('mock-pass-cert-number');
        expect(result.provisionalLicenceProvided).toBe(true);
        expect(result.routeNumber).toBe(12345);
        expect(result.weatherConditions).toEqual(['Bright / dry roads', 'Icy']);
      });
      it('should return null when there is no test result', () => {
        const result: TestSummaryCardModel = component.getTestSummary();
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
    describe('getDebrief', () => {
      it('should return the correct data', () => {
        component.testResult = categoryBTestResultMock;
        const result: DebriefCardModel = component.getDebrief();

        expect(result.legalRequirements).toEqual({
          angledStart: true,
          hillStart: false,
          normalStart1: true,
          normalStart2: false,
        });

        expect(result.controlledStop).toEqual(true);
        expect(result.ecoControl).toEqual(true);
        expect(result.ecoPlanning).toEqual(false);
      });
      it('should return null when there is no test result', () => {
        const result: DebriefCardModel = component.getDebrief();
        expect(result).toBeNull();
      });
    });
    describe('getManoeuvres', () => {
      it('should return None where no manoeuvre has been completed', () => {
        expect(component.getManoeuvres()).toEqual(['None']);
      });
      it('should return the correct values for the manoeuvres', () => {
        component.testResult = categoryBTestResultMock;
        expect(component.getManoeuvres()).toEqual([
          manoeuvreTypeLabels.forwardPark,
          manoeuvreTypeLabels.reverseRight,
        ]);
      });
    });
    describe('getETA', () => {
      it('should return None when there have been no ETAs', () => {
        expect(component.getETA()).toEqual(['None']);
      });
      it('should return the correct values for the ETAs', () => {
        component.testResult = categoryBTestResultMock;
        expect(component.getETA()).toEqual(['Verbal']);
      });
    });
    describe('getShowMeQuestion', () => {
      it('should return undefined if there is no show me question', () => {
        expect(component.getShowMeQuestion()).toBeUndefined();
      });
      it('should return the correct value for a show me question', () => {
        component.testResult = categoryBTestResultMock;
        const result = component.getShowMeQuestion();

        expect(result).toEqual({
          code: 'S1',
          description:
            'When it is safe to do so can you show me how you wash and clean the rear windscreen.',
          shortName: 'Rear windscreen',
        });
      });
    });
    describe('getTellMeQuestion', () => {
      it('should return undefined if there is no tell me question', () => {
        expect(component.getTellMeQuestion()).toBeUndefined();
      });
      it('should return the correct value for the tell me question', () => {
        component.testResult = categoryBTestResultMock;
        const result = component.getTellMeQuestion();

        expect(result).toEqual({
          code: 'T2',
          description:
            // tslint:disable-next-line:max-line-length
            'Tell me where you would find the information for the recommended tyre pressures for this car and how tyre pressures should be checked.',
          shortName: 'Tyre pressures',
        });
      });
    });
    describe('getDangerousFaults', () => {
      it('should return the correct data', () => {
        component.testResult = categoryBTestResultMock;

        const result = component.getDangerousFaults();

        expect(result).toEqual([{
          comment: 'mock-ancillary-controls-comment',
          competencyIdentifier: 'ancillaryControls',
          competencyDisplayName: 'Ancillary Controls',
          source: 'simple',
          faultCount: 1,
        }]);
      });
    });
    describe('getSeriousFaults', () => {
      it('should return the correct data', () => {
        component.testResult = categoryBTestResultMock;

        const result = component.getSeriousFaults();

        expect(result).toEqual([
          {
            comment: 'mock-clearance-comments',
            competencyIdentifier: 'clearance',
            competencyDisplayName: 'Clearance',
            source: 'simple',
            faultCount: 1,
          },
          {
            faultCount: 1,
            competencyDisplayName: 'Controlled Stop',
            competencyIdentifier: 'controlledStop',
            source: 'controlledStop',
            comment: 'mock-controlled-stop-comments',
          },
        ]);
      });
    });
    describe('getDrivingFaults', () => {
      it('should return the correct data', () => {
        component.testResult = categoryBTestResultMock;

        const result = component.getDrivingFaults();

        expect(result).toEqual([{
          comment: 'mock-awareness-planning-comment',
          competencyIdentifier: 'awarenessPlanning',
          competencyDisplayName: 'Awareness planning',
          faultCount: 2,
          source: 'simple',
        }]);
      });
    });
    describe('getControlledStopFault', () => {
      it('should find a controlled stop fault if there is one avalible', () => {
        component.testResult = categoryBTestResultMock;

        const result = component.getControlledStopFault(CompetencyOutcome.S);

        expect(result).toEqual([{
          faultCount: 1,
          competencyDisplayName: 'Controlled Stop',
          competencyIdentifier: 'controlledStop',
          source: 'controlledStop',
          comment: 'mock-controlled-stop-comments',
        }]);
      });
      it('should return an empty array if there is no fault for that fault type', () => {
        component.testResult = categoryBTestResultMock;

        const result = component.getControlledStopFault(CompetencyOutcome.DF);

        expect(result).toEqual([]);
      });
    });
    describe('updateVehicleChecksLabel', () => {
      it('should update the label to Vehicle checks', () => {
        const mockFault = {
          faultCount: 1,
          competencyDisplayName: 'vehicleChecks',
          competencyIdentifier: 'vehicleChecks',
          source: 'vehicleChecks',
          comment: 'mock-vehicle-checks-comments',
        };

        const result = component.updateVehicleChecksLabel(mockFault);

        expect(result.competencyDisplayName).toEqual('Vehicle checks');
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
        fixture.debugElement.query(By.css('examiner-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('vehicle-details-card')),
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
        fixture.debugElement.query(By.css('examiner-details-card')),
      ).toBeNull();
      expect(
        fixture.debugElement.query(By.css('vehicle-details-card')),
      ).toBeNull();
      expect(fixture.debugElement.query(By.css('debrief-card'))).toBeNull();
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
        fixture.debugElement.query(By.css('examiner-details-card')),
      ).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('vehicle-details-card')),
      ).not.toBeNull();
      expect(fixture.debugElement.query(By.css('debrief-card'))).not.toBeNull();
      expect(
        fixture.debugElement.query(By.css('test-summary-card')),
      ).not.toBeNull();
    });
  });
});
