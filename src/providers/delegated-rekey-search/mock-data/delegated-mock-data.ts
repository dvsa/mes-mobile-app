import { TestSlot } from '@dvsa/mes-journal-schema';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

// TODO add to schema
export interface DelegatedExaminerTestSlot extends TestSlot {
  examinerId: number;
}

export function mockGetDelegatedBooking(
  category: TestCategory = TestCategory.B,
  isWelshTest: boolean = false,
  slotNumber: number = 1,
): any {
  return {
    examinerId: 4583912,
    testSlot: {
      slotDetail: {
        slotId: '35294119',
        start: '2020-09-17T08:00:00',
      },
      vehicleTypeCode: 'V4',
      vehicleSlotTypeCode: '122',
      booking: {
        candidate: {
          driverNumber: 'RED99808065W97NM',
          dateOfBirth: '1985-08-06',
          candidateName: {
            firstName: 'Dele',
            lastName: 'Gated-Exam',
          },
        },
        application: {
          applicationId: '24306741',
          bookingSequence: 1,
          checkDigit: 0,
          testCategory: 'CCPC',
        },
      },
    },
  };
}
