import { Candidate } from '@dvsa/mes-test-schema/categories/B';
import { Application } from '../../../shared/models/DJournal';

export const application: Application = {
  applicationId: 1234569,
  bookingSequence: 1,
  checkDigit: 9,
  entitlementCheck: false,
  extendedTest: false,
  progressiveAccess: false,
  testCategory: 'B',
  vehicleGearbox: 'Manual',
  welshTest: false,
};

export const candidate: Candidate = {
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
};

export const practiceSlot = {
  slotDetail: {
    slotId: 'practice_1',
    duration: 57,
    start: '2019-01-01T10:14:00+00:00',
  },
  booking: {
    application,
    candidate,
  },
};
