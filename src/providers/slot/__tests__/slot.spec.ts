import { TestBed } from '@angular/core/testing';
import { cloneDeep } from 'lodash';

import { SlotProvider } from '../slot';
import { Store , StoreModule} from '@ngrx/store';
import { StoreModel } from '../../../common/store.model';
import { TestSlotComponent } from '../../../pages/journal/components/test-slot/test-slot';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AppConfigProvider } from '../../app-config/app-config';
import { AppConfigProviderMock } from '../../app-config/__mocks__/app-config.mock';
import { DateTime } from '../../../common/date-time';

const journalSlotsMissingDays = require('../__mocks__/journal-slots-missing-days-mock.json');

describe('SlotProvider', () => {
  let slotProvider;
  let store$: Store<StoreModel>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        SlotProvider
      ],
    });

    store$ = TestBed.get(Store);
    slotProvider = TestBed.get(SlotProvider);
    spyOn(store$, 'dispatch');
  });

  describe('detectSlotChanges', () => {
    const oldSlots = {
      '2019-01-21': [
        {
          component: TestSlotComponent,
          hasSlotChanged: false,
          slotData: {
            slotDetail: {
              slotId: 1001,
              start: '2018-12-10T08:10:00+00:00',
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
                testCategory: 'B',
                vehicleGearbox: 'Manual',
              },
              previousCancellation: [
                {
                  initiator: 'Act of nature',
                },
              ],
            },
          },
        }, {
          component: TestSlotComponent,
          hasSlotChanged: false,
          slotData: {
            slotDetail: {
              slotId: 1002,
              start: '2018-12-10T10:14:00+00:00',
              duration: 57
            },
            vehicleSlotType: 'B57mins',
            testCentre: {
              centreId: 54321,
              centreName: 'Example Test Centre',
              costCode: 'EXTC1'
            },
            booking: {
              candidate: {
                candidateId: 102,
                age: 22,
                candidateName: {
                  title: 'Mr',
                  firstName: 'Kamil',
                  lastName: 'Zielinski'
                },
                driverNumber: 'ZIELI965220A99HC',
                gender: 'Male',
                candidateAddress: {
                  addressLine1: '10 High Street',
                  addressLine2: 'Someplace',
                  addressLine3: 'Sometown',
                  addressLine4: '',
                  addressLine5: '',
                  postcode: 'AB34 5CD'
                },
                primaryTelephone: '01234 567890',
                mobileTelephone: '07654 123456'
              },
              application: {
                applicationId: 1234568,
                bookingSequence: 1,
                checkDigits: 4,
                welshTest: false,
                extendedTest: false,
                meetingPlace: '',
                progressiveAccess: false,
                specialNeeds: '',
                entitlementCheck: false,
                testCategory: 'B',
                vehicleGearbox: 'Manual'
              }
            }
          }
        }
      ]
    };

    const oldNonTestActivities = [
      {
        slotDetail: {
          slotId: 1003,
          start: '2018-12-10T09:07:00+01:00',
          duration: 57,
        },
        activityCode: '091',
        activityDescription: 'Travel period to detached TC and/or outstation',
        testCentre: {
          centreId: 54321,
          centreName: 'Example Test Centre',
          costCode: 'EXTC',
        },
      }
    ];

    const newJournal = {
      staffNumber: 12345,
      examinerName: {
        title: 'Mr',
        firstName: 'Joe',
        secondName: 'Frederic',
        thirdName: 'Englbert',
        lastName: 'Bloggs',
      },
      permTestCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC1',
      },
      testSlots: cloneDeep(oldSlots['2019-01-21'].map(slot => slot.slotData)),
      nonTestActivities: cloneDeep(oldNonTestActivities),
    }

    describe('when there are no slots in the new journal', () => {
      it('should return a blank array', () => {
        const result = slotProvider.detectSlotChanges({}, {});
        expect(result.length).toBe(0);
      });
    });

    describe('when the new slots match the old slots exactly', () => {
      it('should produce the new slot items indicating there was no change', () => {
        const tempOldSlots = cloneDeep(oldSlots);
        const tempNewJournal = cloneDeep(newJournal);
        const result = slotProvider.detectSlotChanges(tempOldSlots, tempNewJournal);
        expect(result.length).toBe(3);
        expect(result[0].hasSlotChanged).toBe(false);
        expect(result[1].hasSlotChanged).toBe(false);
        expect(result[2].hasSlotChanged).toBe(false);
      });
    });

    describe('when one of the new slots differ from the old slots', () => {
      it('should produce the new slot items indicating there was a change', () => {
        const tempOldSlots = cloneDeep(oldSlots);
        const tempNewJournal = cloneDeep(newJournal);
        tempNewJournal.testSlots[0].booking.candidate.driverNumber = 'NEWDRIVERNUMBER';
        const result = slotProvider.detectSlotChanges(tempOldSlots, tempNewJournal);
        expect(result.length).toBe(3);
        expect(result[0].hasSlotChanged).toBe(true);
        expect(result[1].hasSlotChanged).toBe(false);
        expect(result[2].hasSlotChanged).toBe(false);
      });
    });

    describe('when several of the slots differ from the old slots', () => {
      it('should produce new slot items indicating which slots changed', () => {
        const tempOldSlots = cloneDeep(oldSlots);
        const tempNewJournal = cloneDeep(newJournal);
        tempNewJournal.testSlots[0].booking.candidate.driverNumber = 'NEWDRIVERNUMBER';
        tempNewJournal.testSlots[1].booking.application.welshTest = true;
        const result = slotProvider.detectSlotChanges(tempOldSlots, tempNewJournal);
        expect(result.length).toBe(3);
        expect(result[0].hasSlotChanged).toBe(true);
        expect(result[1].hasSlotChanged).toBe(false);
        expect(result[2].hasSlotChanged).toBe(true);
      });
    });

    describe('when the journal payload contains nonTestActivities', () => {
      it('should mix them into the TestSlots such that they appear in date order', () => {
        const result = slotProvider.detectSlotChanges(oldSlots, newJournal)
        expect(result[1].slotData.activityCode).toBe('091');
      });
    });

  });

  describe('getSlotDate', () => {
    it('should return the correct date YYYY-MM-DD', () => {
      const slot = {
        slotData: {
          slotDetail: {
            start: '2019-01-21T08:10:00+00:00'
          },
        },
      };

      const result = slotProvider.getSlotDate(slot);

      expect(result).toBe('2019-01-21');
    });
  });

  describe('extendWithEmptyDays', () => {
    it('should have all days of the week', () => {
      spyOn(DateTime, 'now').and.callFake(() => DateTime.at('2019-02-01'));
      const slotsWithEmptyDays = slotProvider.extendWithEmptyDays(journalSlotsMissingDays);
      
      const numberOfDays = Object.keys(slotsWithEmptyDays).length;
      
      expect(numberOfDays).toBe(7);
    });
  });

  describe('getRelevantSlots', () => {
    
  })

});
