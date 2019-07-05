import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

export const categoryBTestResultMock : StandardCarTestCATBSchema = {
  category: 'B',
  activityCode: '2',
  journalData: {
    applicationReference: {
      applicationId: 1,
      bookingSequence: 2,
      checkDigit: 3,
    },
    candidate: {

    },
    examiner: {
      individualId: 1,
      staffNumber: 'mock-staff-number',
    },
    testCentre: {
      centreId: 1,
      costCode: 'mock-cost-code',
    },
    testSlotAttributes: {
      slotId: 1,
      start: '2019-07-05T09:00:00',
      extendedTest: false,
      specialNeeds: false,
      welshTest: false,
      examinerVisiting: false,
      vehicleSlotType: 'mock-vehicle-slot-type',
    },
  },
};
