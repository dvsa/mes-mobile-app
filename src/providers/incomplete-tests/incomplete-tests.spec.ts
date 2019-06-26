import { TestBed } from '@angular/core/testing';
import { IncompleteTestsProvider } from './incomplete-tests';
import { SlotSelectorProvider } from '../slot-selector/slot-selector';
import { SlotItem } from '../slot-selector/slot-item';
import { AppConfigProvider } from '../app-config/app-config';
import { AppConfigProviderMock } from '../app-config/__mocks__/app-config.mock';
import { TestStatus } from '../../modules/tests/test-status/test-status.model';

describe('Incomplete Tests Provider', () => {

  let incompleteTestsProvider: IncompleteTestsProvider;

  const catBTest: SlotItem = {
    hasSlotChanged: false,
    slotData: {
      booking: {
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
          testCategory: 'B',
          vehicleGearbox: 'Manual',
        },
      },
    },
  };

  const catBETest: SlotItem = {
    hasSlotChanged: false,
    slotData: {
      booking: {
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
          testCategory: 'B+E',
          vehicleGearbox: 'Manual',
        },
      },
    },
  };

  const testStatuses: { [slotId: string]: TestStatus } = {
    1001: TestStatus.Booked,
    1003: TestStatus.Completed,
    1005: TestStatus.Decided,
    1007: TestStatus.Started,
    1008: TestStatus.Submitted,
  };

  const slots: SlotItem[] = [
    {
      slotData: {
        booking: {
          application: {
            testCategory: 'B',
          },
        },
        slotDetail: {
          slotId: 1001,
          start: '2019-06-26T11:11:00+01:00',
        },
        vehicleSlotType: 'B57mins',
      },
      hasSlotChanged: false,
    },
    {
      slotData: {
        booking: {
          application: {
            testCategory: 'B',
          },
        },
        slotDetail: {
          slotId: 1003,
          start: '2019-06-25T11:11:00+01:00',
        },
        vehicleSlotType: 'B57mins',
      },
      hasSlotChanged: false,
    },
    {
      slotData: {
        booking: {
          application: {
            testCategory: 'B',
          },
        },
        slotDetail: {
          slotId: 1005,
          start: '2019-06-25T11:11:00+01:00',
        },
        vehicleSlotType: 'B57mins',
      },
      hasSlotChanged: false,
    },
    {
      slotData: {
        booking: {
          application: {
            testCategory: 'B',
          },
        },
        slotDetail: {
          slotId: 1007,
          start: '2019-06-27T11:11:00+01:00',
        },
        vehicleSlotType: 'B57mins',
      },
      hasSlotChanged: false,
    },
    {
      slotData: {
        booking: {
          application: {
            testCategory: 'B',
          },
        },
        slotDetail: {
          slotId: 1008,
          start: '2019-06-26T11:11:00+01:00',
        },
        vehicleSlotType: 'B57mins',
      },
      hasSlotChanged: false,
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IncompleteTestsProvider,
        { provide: SlotSelectorProvider, useClass: SlotSelectorProvider },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
      ],
    });
    incompleteTestsProvider = TestBed.get(IncompleteTestsProvider);
  });

  describe('canStartTest', () => {
    it('should return true when a cat B test is used', async () => {
      const result = incompleteTestsProvider.canStartTest(catBTest);
      expect(result).toBe(true);
    });
    it('should return false when a cat B+E test is used', async () => {
      const result = incompleteTestsProvider.canStartTest(catBETest);
      expect(result).toBe(false);
    });
  });

  describe('countIncompleteTests', () => {
    it('should return 2 tests in the past that arent submitted when passed the mock data', () => {
      const result = incompleteTestsProvider.countIncompleteTests(testStatuses, slots);
      expect(result).toEqual(2);
    });
  });

  describe('isDateInPast', () => {
    it('should return false if todays date', () => {
      const result = incompleteTestsProvider.isDateInPast(new Date());
      expect(result).toEqual(false);
    });
    it('should return false if tomorrows date', () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      const result = incompleteTestsProvider.isDateInPast(date);
      expect(result).toEqual(false);
    });
    it('should return true if yesterdays date', () => {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const result = incompleteTestsProvider.isDateInPast(date);
      expect(result).toEqual(true);
    });
  });
});
