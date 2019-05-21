import { Candidate } from '@dvsa/mes-test-schema/categories/B';
import { Application } from '../../../shared/models/DJournal';

export const testReportPracticeSlotId = 'test_report_practice';
export const end2endPracticeSlotId = 'end_2_end_practice';

export const testReportPracticeModeApplication: Application = {
  applicationId: 12345692,
  bookingSequence: 1,
  checkDigit: 9,
  entitlementCheck: false,
  extendedTest: false,
  progressiveAccess: false,
  testCategory: 'B',
  vehicleGearbox: 'Manual',
  welshTest: false,
};

export const testReportPracticeModeCandidate: Candidate = {
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
    title: 'Test Report',
  },
  driverNumber: 'MODEX625220A99HC',
  mobileTelephone: '07654 123456',
};

export const testReportPracticeModeSlot = {
  slotDetail: {
    slotId: testReportPracticeSlotId,
    duration: 57,
    start: '2019-01-01T10:14:00+00:00',
  },
  booking: {
    application: testReportPracticeModeApplication,
    candidate: testReportPracticeModeCandidate,
  },
};

export const end2endPracticeModeApplication: Application = {
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

export const end2endPracticeModeCandidate: Candidate = {
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
    title: 'End to End',
  },
  driverNumber: 'MODEX625220A99HC',
  mobileTelephone: '07654 123456',
};

export const end2endPracticeModeSlot = {
  slotDetail: {
    slotId: end2endPracticeSlotId,
    duration: 57,
    start: '2019-01-01T10:14:00+00:00',
  },
  booking: {
    application: end2endPracticeModeApplication,
    candidate: end2endPracticeModeCandidate,
  },
};
