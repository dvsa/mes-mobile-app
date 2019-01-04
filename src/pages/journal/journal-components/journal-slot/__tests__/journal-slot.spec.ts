import { MockComponent } from 'ng-mocks';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { JournalTestDetailsComponent } from '../../journal-test-details/journal-test-details';
import { JournalTestOutcomeComponent } from '../../journal-test-outcome/journal-test-outcome';
import { JournalTimeComponent } from '../../journal-time/journal-time';
import { JournalSlotComponent } from '../journal-slot';
import { JournalCandidateComponent } from '../../journal-candidate/journal-candidate';
import { IonicModule, Config } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ConfigMock } from 'ionic-mocks-jest';

describe('JournalSlotComponent', () => {
    let fixture: ComponentFixture<JournalSlotComponent>;
    let component: JournalSlotComponent;
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
              vehicleSeats: null,
              vehicleHeight: null,
              vehicleWidth: null,
              vehicleLength: null,
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
                JournalSlotComponent,
                MockComponent(JournalTimeComponent),
                MockComponent(JournalTestDetailsComponent),
                MockComponent(JournalTestOutcomeComponent),
                MockComponent(JournalCandidateComponent),
            ],
            imports: [IonicModule],
            providers: [ { provide: Config, useFactory: () => ConfigMock.instance() } ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(JournalSlotComponent);
            component = fixture.componentInstance;
            component.slot = mockSlot;
        })
    }));

    describe('DOM', () => {
    describe('Component Interaction', () => {
       it('should pass something to sub-component journal-time input', () => {
           fixture.detectChanges();
           const subByDirective = fixture.debugElement.query(By.directive(MockComponent(JournalTimeComponent))).componentInstance;
           expect(subByDirective.time).toBe('2018-12-10T09:07:00+00:00');
        });  // unit tests for the component template

        it('should pass something to sub-component journal-candidate input', () => {
            fixture.detectChanges();
            const subByDirective = fixture.debugElement.query(By.directive(MockComponent(JournalCandidateComponent))).componentInstance;
            expect(subByDirective.name.title).toBe('Miss');
            expect(subByDirective.name.firstName).toBe('Florence');
            expect(subByDirective.name.lastName).toBe('Pearson');
            expect(subByDirective.testCategory).toBe('B57mins');
         });  // unit tests for the component template

         it('should pass something to sub-component journal-test-details input', () => {
            fixture.detectChanges();
            const subByDirective = fixture.debugElement.query(By.directive(MockComponent(JournalTestDetailsComponent))).componentInstance;
            expect(subByDirective.testCentreName).toBe('Example Test Centre');
         });  // unit tests for the component template
    });
  });

}); 
