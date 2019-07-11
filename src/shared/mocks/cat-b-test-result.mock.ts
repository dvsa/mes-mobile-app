import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

export const categoryBTestResultMock : StandardCarTestCATBSchema = {
  category: 'B',
  activityCode: '2',
  rekey: false,
  journalData: {
    applicationReference: {
      applicationId: 1,
      bookingSequence: 23,
      checkDigit: 4,
    },
    candidate: {
      candidateName: {
        title: 'Miss',
        firstName: 'Doris',
        lastName: 'Pearson',
      },
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
      vehicleTypeCode: 'mock-vehicle-type-code',
    },
  },
  vehicleDetails: {
    gearboxCategory: 'Manual',
    registrationNumber: 'mock-vehicle-registration-number',
  },
  instructorDetails: {
    registrationNumber: 1,
  },
  accompaniment: {
    ADI: true,
    interpreter: true,
    other: false,
    supervisor: false,
  },
  passCompletion: {
    passCertificateNumber: 'mock-pass-cert-number',
    provisionalLicenceProvided: true,
  },
  testSummary: {
    D255: false,
    candidateDescription: 'mock-candidate-description',
    debriefWitnessed: true,
    independentDriving: 'Sat nav',
    routeNumber: 12345,
    weatherConditions: ['Bright / dry roads', 'Icy'],
  },
};
