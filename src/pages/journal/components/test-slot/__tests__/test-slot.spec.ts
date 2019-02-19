import { MockComponent } from 'ng-mocks';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TestSlotComponent } from '../test-slot';
import { IonicModule, Config } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { cloneDeep } from 'lodash';
import { IndicatorsComponent } from '../../indicators/indicators';
import { TimeComponent } from '../../time/time';
import { TestOutcomeComponent } from '../../test-outcome/test-outcome';
import { CandidateLinkComponent } from '../../candidate-link/candidate-link';
import { TestCategoryComponent } from '../../test-category/test-category';
import { VehicleDetailsComponent } from '../../vehicle-details/vehicle-details';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../__mocks__/screen-orientation.mock';
import { TestCategoryIconComponent } from '../../../../../components/test-category-icon/test-category-icon';
import { LanguageComponent } from '../../language/language';
import { LocationComponent } from '../../location/location';

describe('TestSlotComponent', () => {
  let fixture: ComponentFixture<TestSlotComponent>;
  let component: TestSlotComponent;
  const mockSlot = {
    slotDetail: {
      slotId: 1001,
      start: '2018-12-10T09:07:00+00:00',
      duration: 57,
    },
    vehicleSlotType: 'B57mins',
    testCentre: {
      centreId: 54321,
      centreName: 'Example Test Centre',
      costCode: 'EXTC1',
    },
    booking: {
      candidate: {
        candidateId: 101,
        age: 17,
        candidateName: {
          title: 'Miss',
          firstName: 'Florence',
          lastName: 'Pearson',
        },
        driverNumber: 'PEARS015220A99HC',
        gender: 'Female',
        candidateAddress: {
          addressLine1: '1 Station Street',
          addressLine2: 'Someplace',
          addressLine3: 'Sometown',
          addressLine4: '',
          addressLine5: '',
          postcode: 'AB12 3CD',
        },
        primaryTelephone: '01234 567890',
        secondaryTelephone: '04321 098765',
        mobileTelephone: '07654 123456',
      },
      application: {
        applicationId: 1234567,
        bookingSequence: 3,
        checkDigits: 1,
        welshTest: false,
        extendedTest: false,
        meetingPlace: '',
        progressiveAccess: false,
        specialNeeds: 'Candidate has dyslexia',
        entitlementCheck: false,
        vehicleSeats: 5,
        vehicleHeight: 4,
        vehicleWidth: 3,
        vehicleLength: 2,
        testCategory: 'B',
        vehicleGearbox: 'Manual',
      },
      previousCancellation: [
        {
          initiator: 'Act of nature',
        },
      ],
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestSlotComponent,
        MockComponent(LanguageComponent),
        MockComponent(LocationComponent),
        MockComponent(IndicatorsComponent),
        MockComponent(TimeComponent),
        MockComponent(TestCategoryComponent),
        MockComponent(TestOutcomeComponent),
        MockComponent(VehicleDetailsComponent),
        MockComponent(CandidateLinkComponent),
        MockComponent(TestCategoryIconComponent),
      ],
      imports: [IonicModule],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },

      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestSlotComponent);
      component = fixture.componentInstance;
      component.slot = cloneDeep(mockSlot);
      component.showLocation = true;
    });
  }));

  describe('Class', () => {
    describe('isIndicatorNeededForSlot', () => {
      it('should return true if specialNeeds is a non-blank string', () => {
        expect(component.isIndicatorNeededForSlot()).toBe(true);
      });
      it('should return false if specialNeeds is blank (and entitlementCheck is false)', () => {
        component.slot.booking.application.specialNeeds = '';
        expect(component.isIndicatorNeededForSlot()).toBe(false);
      });
      it('should return false if specialNeeds is missing', () => {
        delete component.slot.booking.application;
        expect(component.isSpecialNeedsSlot()).toBe(false);
      });
      it('should return true if entitlementCheck is true (and specialNeeds is blank)', () => {
        component.slot.booking.application.specialNeeds = '';
        component.slot.booking.application.entitlementCheck = true;
        expect(component.isIndicatorNeededForSlot()).toBe(true);
      });
      it('should return false if entitlementCheck is missing (and specialNeeds is blank)', () => {
        component.slot.booking.application.specialNeeds = '';
        delete component.slot.booking.application.entitlementCheck;
        expect(component.isIndicatorNeededForSlot()).toBe(false);
      });
      it('should return false if entitlementCheck is false (and specialNeeds is blank)', () => {
        component.slot.booking.application.specialNeeds = '';
        component.slot.booking.application.entitlementCheck = false;
        expect(component.isIndicatorNeededForSlot()).toBe(false);
      });

      it('should return correct value for showing vehicle details', () => {
        component.slot.booking.application.testCategory = 'A';
        expect(component.showVehicleDetails()).toBeFalsy();
        component.slot.booking.application.testCategory = 'A1';
        expect(component.showVehicleDetails()).toBeFalsy();
        component.slot.booking.application.testCategory = 'A2';
        expect(component.showVehicleDetails()).toBeFalsy();
        component.slot.booking.application.testCategory = 'AM';
        expect(component.showVehicleDetails()).toBeFalsy();
        component.slot.booking.application.testCategory = 'B';
        expect(component.showVehicleDetails()).toBeFalsy();
        component.slot.booking.application.testCategory = 'B1';
        expect(component.showVehicleDetails()).toBeFalsy();
        component.slot.booking.application.testCategory = 'B+E';
        expect(component.showVehicleDetails()).toBeFalsy();
        component.slot.booking.application.testCategory = 'C';
        expect(component.showVehicleDetails()).toBeTruthy();
        component.slot.booking.application.testCategory = 'C1';
        expect(component.showVehicleDetails()).toBeTruthy();
        component.slot.booking.application.testCategory = 'C1+E';
        expect(component.showVehicleDetails()).toBeTruthy();
        component.slot.booking.application.testCategory = 'C+E';
        expect(component.showVehicleDetails()).toBeTruthy();
        component.slot.booking.application.testCategory = 'D';
        expect(component.showVehicleDetails()).toBeTruthy();
        component.slot.booking.application.testCategory = 'D1';
        expect(component.showVehicleDetails()).toBeTruthy();
        component.slot.booking.application.testCategory = 'D+E';
        expect(component.showVehicleDetails()).toBeTruthy();
        component.slot.booking.application.testCategory = 'D1+E';
        expect(component.showVehicleDetails()).toBeTruthy();
      });
      it('should return true for isPortrait() if device is portrait', () => {
        component.screenOrientation.type = component.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY;
        expect(component.isPortrait()).toBeTruthy();
        component.screenOrientation.type = component.screenOrientation.ORIENTATIONS.PORTRAIT;
        expect(component.isPortrait()).toBeTruthy();
      });
      it('should return false for isPortrait() if device is landscape', () => {
        component.screenOrientation.type = component.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY;
        expect(component.isPortrait()).toBeFalsy();
        component.screenOrientation.type = component.screenOrientation.ORIENTATIONS.LANDSCAPE;
        expect(component.isPortrait()).toBeFalsy();
      });
    });

    describe('isSpecialNeedsSlot', () => {
      it('should return true if there is a non-empty special needs string', () => {
        component.slot.booking.application.specialNeeds = 'something';
        expect(component.isSpecialNeedsSlot()).toBe(true);
      });
      it('should return false if special needs is an empty string', () => {
        component.slot.booking.application.specialNeeds = '';
        expect(component.isSpecialNeedsSlot()).toBe(false);
      });
      it('should return false if special needs is null', () => {
        component.slot.booking.application.specialNeeds = null;
        expect(component.isSpecialNeedsSlot()).toBe(false);
      });
    });
  });

  describe('DOM', () => {
    describe('Component Interaction', () => {
      it('should pass the special needs status to a indicator component', () => {

        component.slot.booking.application.specialNeeds = '';
        fixture.detectChanges();
        const indicatorComponent = fixture.debugElement.query(
          By.directive(MockComponent(IndicatorsComponent))).componentInstance;
        expect(indicatorComponent).toBeDefined();
        expect(indicatorComponent.showExclamationIndicator).toBeFalsy();
      });

      it('should pass something to sub-component time input', () => {
        fixture.detectChanges();
        const subByDirective = fixture.debugElement.query(By.directive(MockComponent(TimeComponent))).componentInstance;
        expect(subByDirective.time).toBe('2018-12-10T09:07:00+00:00');
      });

      it('should pass something to sub-component candidate input', () => {
        fixture.detectChanges();
        const subByDirective = fixture.debugElement.query(
          By.directive(MockComponent(CandidateLinkComponent))).componentInstance;
        expect(subByDirective.name.title).toBe('Miss');
        expect(subByDirective.name.firstName).toBe('Florence');
        expect(subByDirective.name.lastName).toBe('Pearson');
        expect(subByDirective.isPortrait).toBeFalsy();
      });

      it('should pass something to sub-component test-category  input', () => {
        fixture.detectChanges();
        const subByDirective = fixture.debugElement.query(
          By.directive(MockComponent(TestCategoryComponent))).componentInstance;
        expect(subByDirective.category).toBe('B');
      });

      it('should pass something to sub-component test-outcome  input', () => {
        fixture.detectChanges();
        const subByDirective = fixture.debugElement.query(
          By.directive(MockComponent(TestOutcomeComponent))).componentInstance;
        expect(subByDirective.slot).toEqual(mockSlot);
      });

      it('should pass something to sub-component vehicle-details  input', () => {
        fixture.detectChanges();
        const subByDirective = fixture.debugElement.query(
          By.directive(MockComponent(VehicleDetailsComponent))).componentInstance;
        expect(subByDirective.height).toBe(4);
        expect(subByDirective.width).toBe(3);
        expect(subByDirective.length).toBe(2);
        expect(subByDirective.seats).toBe(5);
        expect(subByDirective.transmission).toBe('Manual');
        expect(subByDirective.showDimensions).toBeFalsy();
        expect(subByDirective.showVehicleDetails).toBeFalsy();
      });

      it('should pass something to sub-component language  input', () => {
        fixture.detectChanges();
        const subByDirective = fixture.debugElement.query(
          By.directive(MockComponent(LanguageComponent))).componentInstance;
        expect(subByDirective.welshLanguage).toBeFalsy();
      });

      it('should pass something to sub-component location input', () => {
        fixture.detectChanges();
        const subByDirective = fixture.debugElement.query(
          By.directive(MockComponent(LocationComponent))).componentInstance;
        expect(subByDirective.location).toBe('Example Test Centre');
      });
    });
  });

});
