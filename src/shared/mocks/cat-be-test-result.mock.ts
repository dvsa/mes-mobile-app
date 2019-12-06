import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

export const categoryBETestResultMock : CatBEUniqueTypes.TestResult = {
  version: '0.0.1',
  category: 'B',
  activityCode: '2',
  rekey: true,
  rekeyDate: '2019-08-05T09:00:00',
  rekeyReason: {
    ipadIssue: {
      selected: true,
      broken: false,
      lost: true,
      technicalFault: false,
      stolen: false,
    },
    transfer: {
      selected: false,
    },
    other: {
      selected: true,
      reason: 'mock reason',
    },
  },
  changeMarker: false,
  examinerBooked: 1,
  examinerConducted: 1,
  examinerKeyed: 1,
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
      emailAddress: 'candidate@candidate.com',
      dateOfBirth: '01-01-2020',
      gender: 'F',
      primaryTelephone: '1234567890',
      mobileTelephone: '2345678901',
      businessName: 'Example Business',
      businessAddress: {
        addressLine1: '1 Example Road',
        addressLine2: 'Exampleton',
        addressLine3: 'Exampleland',
        postcode: 'EXA MPLE',
      },
      businessTelephone: '0123456789',
    },
    examiner: {
      individualId: 1,
      staffNumber: 'mock-staff-number',
    },
    testCentre: {
      centreId: 1,
      costCode: 'mock-cost-code',
      centreName: 'mock-centre-name',
    },
    testSlotAttributes: {
      slotId: 1,
      start: '2019-07-05T09:00:00',
      extendedTest: false,
      specialNeeds: false,
      specialNeedsArray: ['special need 1', 'special need 2'],
      entitlementCheck: true,
      slotType: 'slot-type-mock',
      previousCancellation: ['Act of nature', 'DSA'],
      welshTest: false,
      examinerVisiting: false,
      vehicleTypeCode: 'mock-vehicle-type-code',
    },
  },
  vehicleDetails: {
    gearboxCategory: 'Manual',
    registrationNumber: 'mock-vehicle-registration-number',
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
    code78Present: true,
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
    uncoupleRecouple: {
      selected: true,
      fault: 'S',
      faultComments: 'mock uncouple-recouple comments',
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
    eyesightTest: {
      complete: true,
      seriousFault: false,
      faultComments: 'mock-eyesight-test-comments',
    },
    manoeuvres: {
      reverseLeft: {
        selected: true,
        controlFault: 'DF',
        observationFault: 'S',
        observationFaultComments: 'mock-observation-fault-comments',
      },
    },
    seriousFaults: {
      clearance: true,
      clearanceComments: 'mock-clearance-comments',
    },
    testRequirements: {
      angledStartControlledStop: true,
      downhillStart: true,
      normalStart1: true,
      normalStart2: true,
      uphillStart: true,
    },
    vehicleChecks: {
      showMeQuestions: [
        {
          code: 'S1',
          description: 'mock-s1-description',
          outcome: 'P',
        },
        {
          code: 'S2',
          description: 'mock-s2-description',
          outcome: 'P',
        },
        {
          code: 'S3',
          description: 'mock-s3-description',
          outcome: 'DF',
        },
      ],
      tellMeQuestions: [
        {
          code: 'T1',
          description: 'mock-t1-description',
          outcome: 'P',
        },
        {
          code: 'T2',
          description: 'mock-t2-description',
          outcome: 'P',
        },
      ],
    },
  },
};
