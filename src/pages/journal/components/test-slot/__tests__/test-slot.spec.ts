import { MockComponent } from 'ng-mocks';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TestSlotComponent } from '../test-slot';
import { IonicModule, Config } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks-jest';
import { cloneDeep } from 'lodash';
import { IndicatorsComponent } from '../../indicators/indicators';
import { TimeComponent } from '../../time/time';
import { TestOutcomeComponent } from '../../test-outcome/test-outcome';
import { CandidateComponent } from '../../candidate/candidate';
import { TestCategoryComponent } from '../../test-category/test-category';
import { VehicleDetailsComponent } from '../../vehicle-details/vehicle-details';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../__mocks__/screen-orientation.mock';
import { TestCategoryIconComponent } from '../../../../../components/test-category-icon/test-category-icon';

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
                MockComponent(IndicatorsComponent),
                MockComponent(TimeComponent),
                MockComponent(TestCategoryComponent),
                MockComponent(TestOutcomeComponent),
                MockComponent(VehicleDetailsComponent),
                MockComponent(CandidateComponent),
                MockComponent(TestCategoryIconComponent)
            ],
            imports: [IonicModule],
            providers: [
              { provide: Config, useFactory: () => ConfigMock.instance() },
              { provide: ScreenOrientation, useClass: ScreenOrientationMock}

            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TestSlotComponent);
            component = fixture.componentInstance;
            component.slot = cloneDeep(mockSlot);
        })
    }));

    describe('Class', () => {
      describe('isSpecialNeedsSlot', () => {
        it('should return true if specialNeeds is a non-blank string', () => {
          expect(component.isSpecialNeedsSlot()).toBe(true);
        });
        it('should return false if specialNeeds is blank', () => {
          component.slot.booking.application.specialNeeds = '';
          expect(component.isSpecialNeedsSlot()).toBe(false);
        });
        it('should return false if specialNeeds is missing', () => {
          delete component.slot.booking.application;
          expect(component.isSpecialNeedsSlot()).toBe(false);
        });
      });
    });

    describe('DOM', () => {
      describe('Component Interaction', () => {
        it('should pass the special needs status to a indicator component', () => {

          component.slot.booking.application.specialNeeds = ''
          fixture.detectChanges();
          const indicatorComponent = fixture.debugElement.query(By.directive(MockComponent(IndicatorsComponent))).componentInstance;
          expect(indicatorComponent).toBeDefined();
          expect(indicatorComponent.showSpecialNeedsIndicator).toBeFalsy();
        });

        it('should pass something to sub-component time input', () => {
          fixture.detectChanges();
          const subByDirective = fixture.debugElement.query(By.directive(MockComponent(TimeComponent))).componentInstance;
          expect(subByDirective.time).toBe('2018-12-10T09:07:00+00:00');
        });

        it('should pass something to sub-component candidate input', () => {
          fixture.detectChanges();
          const subByDirective = fixture.debugElement.query(By.directive(MockComponent(CandidateComponent))).componentInstance;
          expect(subByDirective.name.title).toBe('Miss');
          expect(subByDirective.name.firstName).toBe('Florence');
          expect(subByDirective.name.lastName).toBe('Pearson');
          expect(subByDirective.welshTest).toBeFalsy();
          expect(subByDirective.isPortrait).toBeFalsy();
        });

        it('should pass something to sub-component test-category  input', () => {
          fixture.detectChanges();
          const subByDirective = fixture.debugElement.query(By.directive(MockComponent(TestCategoryComponent))).componentInstance;
          expect(subByDirective.category).toBe('B');
        });

        it('should pass something to sub-component test-category-icon  input', () => {
          fixture.detectChanges();
          const subByDirective = fixture.debugElement.query(By.directive(MockComponent(TestCategoryIconComponent))).componentInstance;
          expect(subByDirective.category).toBe('B');
        });

        it('should pass something to sub-component test-outcome  input', () => {
          fixture.detectChanges();
          const subByDirective = fixture.debugElement.query(By.directive(MockComponent(TestOutcomeComponent))).componentInstance;
          expect(subByDirective.slot).toEqual(mockSlot);
        });

        it('should pass something to sub-component vehicle-details  input', () => {
          fixture.detectChanges();
          const subByDirective = fixture.debugElement.query(By.directive(MockComponent(VehicleDetailsComponent))).componentInstance;
          expect(subByDirective.height).toBe(4);
          expect(subByDirective.width).toBe(3);
          expect(subByDirective.length).toBe(2);
          expect(subByDirective.seats).toBe(5);
          expect(subByDirective.transmission).toBe('Manual');
          expect(subByDirective.showDimensions).toBeFalsy();
          expect(subByDirective.showVehicleDetails).toBeFalsy();
        });
      });
  });

});
