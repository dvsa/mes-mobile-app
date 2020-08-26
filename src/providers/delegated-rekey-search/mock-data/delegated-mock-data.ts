import { TestSlot } from '@dvsa/mes-journal-schema';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export function getDelegatedBooking(category: TestCategory, isWelshTest: boolean, slotNumber: number): TestSlot {
  return {
    booking: {
      application: {
        applicationId: 22123411,
        bookingSequence: 3,
        checkDigit: 1,
        testCategory: category,
        welshTest: isWelshTest,
      },
      candidate: {
        candidateName: {
          firstName: 'A Delegated',
          lastName: 'Candidate',
        },
        driverNumber: 'DAVID015220A99HC',
        dateOfBirth: '1980-01-01',
      },
    },
    slotDetail: {
      slotId: slotNumber,
      start: '2020-07-15T08:10:00',
    },
    vehicleTypeCode: category,
  };
}
