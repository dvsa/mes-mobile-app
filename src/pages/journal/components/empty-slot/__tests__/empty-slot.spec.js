import { MockComponent } from 'ng-mocks';
import { TestBed, async } from '@angular/core/testing';
import { EmptySlotComponent } from '../empty-slot';
import { IonicModule, Config } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks';
import { cloneDeep } from 'lodash';
import { TimeComponent } from '../../../../../components/test-slot/time/time';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../../../shared/mocks/screen-orientation.mock';
import { LocationComponent } from '../../../../../components/test-slot/location/location';
import { configureTestSuite } from 'ng-bullet';
describe('EmptySlotComponent', function () {
    var fixture;
    var component;
    var mockSlot = {
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
                checkDigit: 1,
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
                'Act of nature',
            ],
        },
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                EmptySlotComponent,
                MockComponent(TimeComponent),
                MockComponent(LocationComponent),
            ],
            imports: [IonicModule],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: ScreenOrientation, useClass: ScreenOrientationMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(EmptySlotComponent);
        component = fixture.componentInstance;
        component.slot = cloneDeep(mockSlot);
    }));
    describe('DOM', function () {
        describe('Component Interaction', function () {
            it('should pass something to sub-component time input', function () {
                fixture.detectChanges();
                var subByDirective = fixture.debugElement.query(By.directive(MockComponent(TimeComponent))).componentInstance;
                expect(subByDirective.time).toBe('2018-12-10T09:07:00+00:00');
            });
            it('should pass something to sub-component location input', function () {
                component.showLocation = true;
                fixture.detectChanges();
                var subByDirective = fixture.debugElement.query(By.directive(MockComponent(LocationComponent))).componentInstance;
                expect(subByDirective.location).toBe('Example Test Centre');
            });
        });
    });
});
//# sourceMappingURL=empty-slot.spec.js.map