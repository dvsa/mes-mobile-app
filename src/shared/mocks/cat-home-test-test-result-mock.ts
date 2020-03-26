import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';

type CatHomeTestResultUnion =
  | CatFUniqueTypes.TestResult
  | CatGUniqueTypes.TestResult
  | CatHUniqueTypes.TestResult
  | CatKUniqueTypes.TestResult;

export const categoryHomeTestTestResultMock: CatHomeTestResultUnion = {
  version: '3.24.4',
  category: 'H',
  activityCode: '1',
  journalData: {
    examiner: {
      staffNumber: '10000012',
      individualId: 1000012,
    },
    testCentre: {
      centreId: 54321,
      costCode: 'EXTC1',
      centreName: 'Example Test Centre',
    },
    testSlotAttributes: {
      welshTest: false,
      slotId: 2211,
      start: '2020-03-24T08:10:00',
      specialNeeds: false,
      specialNeedsCode: 'NONE',
      specialNeedsArray: [
        'None',
      ],
      vehicleTypeCode: 'C',
      extendedTest: false,
      examinerVisiting: false,
      previousCancellation: [
        'Act of nature',
      ],
      entitlementCheck: false,
      slotType: 'Standard Test',
    },
    candidate: {
      candidateName: {
        title: 'Miss',
        firstName: 'Florence',
        lastName: 'Pearson',
      },
      driverNumber: 'PEARSL6767655777BN',
      emailAddress: 'candidate@candidate.com',
      dateOfBirth: '01-01-2020',
      gender: 'F',
      primaryTelephone: '1234567890',
      mobileTelephone: '2345678901',
      candidateAddress: {
        addressLine1: '999 Letsby Avenue',
        addressLine2: 'Someplace',
        addressLine3: 'Sometown',
        postcode: 'AB67 8CD',
      },
      businessName: 'Logistic and Distribution Training Limited',
      businessAddress: {
        addressLine1: '18 Bridge Street',
        addressLine2: 'Horncastle',
        addressLine3: 'Lincolnshire',
        postcode: 'LN9 5JA',
      },
      businessTelephone: '07988 674 536',
    },
    applicationReference: {
      applicationId: 22123411,
      bookingSequence: 3,
      checkDigit: 1,
    },
  },
  accompaniment: {},
  vehicleDetails: {
    registrationNumber: 'X12345X',
    gearboxCategory: 'Manual',
  },
  testData: {
    drivingFaults: {},
    dangerousFaults: {},
    seriousFaults: {},
    vehicleChecks: {
      tellMeQuestions: [
        {
          code: 'H13',
          description: 'Brakes',
          outcome: 'P',
        },
      ],
      showMeQuestions: [
        {
          code: 'H1',
          description: 'Direction indicators',
          outcome: 'P',
        },
      ],
    },
    controlledStop: {
      selected: true,
    },
    highwayCodeSafety: {
      selected: true,
    },
    eco: {
      completed: true,
    },
    ETA: {},
    eyesightTest: {
      complete: true,
      seriousFault: false,
    },
    manoeuvres: {
      reverseLeft: {
        selected: true,
      },
    },
    testRequirements: {
      uphillStartDesignatedStart: true,
      normalStart2: true,
      normalStart1: true,
      angledStart: true,
    },
  },
  testSummary: {
    routeNumber: 88,
    independentDriving: 'N/A',
    candidateDescription: null,
    additionalInformation: null,
    weatherConditions: [],
    debriefWitnessed: true,
    D255: true,
    identification: 'Licence',
  },
  communicationPreferences: {
    updatedEmail: '',
    communicationMethod: 'Post',
    conductedLanguage: 'English',
  },
  rekey: false,
  rekeyDate: null,
  rekeyReason: {
    ipadIssue: {
      selected: false,
      broken: false,
      lost: false,
      technicalFault: false,
      stolen: false,
    },
    other: {
      selected: false,
      reason: '',
    },
    transfer: {
      selected: false,
    },
  },
  examinerBooked: 10000012,
  examinerConducted: 10000012,
  examinerKeyed: 10000012,
  changeMarker: false,
};
