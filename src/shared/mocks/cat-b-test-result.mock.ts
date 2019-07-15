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
      driverNumber: 'mock-driver-number',
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
  testData: {
    controlledStop: {
      selected: true,
      fault: 'S',
      faultComments: 'mock-controlled-stop-comments',
    },
    dangerousFaults: {
      ancillaryControls: true,
      ancillaryControlsComments: 'mock-ancillary-controls-comment',
    },
    drivingFaults: {
      awarenessPlanning: 2,
      awarenessPlanningComments: 'mock-awareness-planning-comment',
    },
    eco: {
      completed: true,
      adviceGivenControl: true,
      adviceGivenPlanning: false,
    },
    ETA: {
      physical: false,
      verbal: true,
    },
    manoeuvres: {
      forwardPark: {
        selected: true,
      },
      reverseParkCarpark: {
        selected: false,
      },
      reverseRight: {
        selected: true,
      },
    },
    seriousFaults: {
      clearance: true,
      clearanceComments: 'mock-clearance-comments',
    },
    testRequirements: {
      angledStart: true,
      hillStart: false,
      normalStart1: true,
      normalStart2: false,
    },
    vehicleChecks: {
      showMeQuestion: {
        code: 'S1',
      },
      tellMeQuestion: {
        code: 'T2',
      },
    },
  },
};
