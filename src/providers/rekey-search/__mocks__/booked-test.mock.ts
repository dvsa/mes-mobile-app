import { TestSlot } from '@dvsa/mes-journal-schema';

export const bookedTestMock: TestSlot = {
  slotDetail: {
    slotId: 123456,
    duration: 57,
    start: '2019-01-01T10:14:00+00:00',
  },
  booking: {
    application: {
      applicationId: 12345692,
      bookingSequence: 1,
      checkDigit: 9,
      entitlementCheck: false,
      extendedTest: false,
      progressiveAccess: false,
      testCategory: 'B',
      vehicleGearbox: 'Manual',
      welshTest: false,
    },
    candidate: {
      candidateAddress: {
        addressLine1: 'My House',
        addressLine2: 'Someplace',
        addressLine3: 'Sometown',
        postcode: 'AB45 6CD',
      },
      candidateId: 1,
      candidateName: {
        firstName: 'Practice',
        lastName: 'Mode',
        title: 'Miss',
      },
      driverNumber: 'MODEX625220A99HC',
      mobileTelephone: '07654 123456',
      emailAddress: 'practice@mode.com',
    },
  },
};
