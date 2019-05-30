import * as moment from 'moment';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';

const todayAt8Am = moment().startOf('day').add(8, 'hour');

export const fakeJournalTestSlots = [
  {
    booking: {
      application: {
        applicationId: 1234567,
        bookingSequence: 3,
        checkDigit: 1,
        entitlementCheck: false,
        extendedTest: false,
        progressiveAccess: false,
        specialNeeds: 'Candidate has dyslexia',
        specialNeedsCode: 'NONE',
        specialNeedsExtendedTest: false,
        testCategory: 'B',
        vehicleGearbox: 'Automatic',
        welshTest: false,
        meetingPlace: 'At the pub',
      },
      candidate: {
        candidateAddress: {
          addressLine1: '1 Station Street',
          addressLine2: 'Someplace',
          addressLine3: 'Sometown',
          postcode: 'AB12 3CD',
        },
        candidateId: 101,
        candidateName: {
          firstName: 'Florence',
          lastName: 'Pearson',
          title: 'Miss',
        },
        driverNumber: 'PEARS015220A99HC',
        mobileTelephone: '07654 123456',
        primaryTelephone: '01234 567890',
        secondaryTelephone: '04321 098765',
        emailAddress: 'florence@pearson.com',
      },
      previousCancellation: [
        'Act of nature',
      ],
    },
    slotDetail: {
      duration: 57,
      slotId: `${end2endPracticeSlotId}_1`,
      start: todayAt8Am.add(10, 'minutes').format(),
    },
    testCentre: {
      centreId: 54321,
      centreName: 'Example Test Centre',
      costCode: 'EXTC1',
    },
    vehicleSlotType: 'Voc90mins',
  },
  {
    booking: {
      application: {
        applicationId: 1234569,
        bookingSequence: 1,
        checkDigit: 9,
        entitlementCheck: false,
        extendedTest: false,
        progressiveAccess: false,
        testCategory: 'B',
        vehicleGearbox: 'Automatic',
        welshTest: true,
        meetingPlace: 'At the pub',
      },
      candidate: {
        candidateAddress: {
          addressLine1: 'My House',
          addressLine2: 'Someplace',
          addressLine3: 'Sometown',
          postcode: 'AB45 6CD',
        },
        candidateId: 103,
        candidateName: {
          firstName: 'Jane',
          lastName: 'Doe',
          title: 'Mrs',
        },
        driverNumber: 'DOEXX625220A99HC',
        mobileTelephone: '07654 123456',
        emailAddress: 'jane@doe.com',
      },
      previousCancellation: [
        'DSA',
        'Act of nature',
      ],
    },
    slotDetail: {
      duration: 57,
      slotId: `${end2endPracticeSlotId}_2`,
      start: todayAt8Am.add(57, 'minutes').format(),
    },
    testCentre: {
      centreId: 54321,
      centreName: 'Example Test Centre',
      costCode: 'EXTC1',
    },
    vehicleSlotType: 'B57mins',
    vehicleSlotTypeCode: 7,
  },
  {
    booking: {
      application: {
        applicationId: 1234570,
        bookingSequence: 2,
        checkDigit: 2,
        entitlementCheck: false,
        extendedTest: false,
        progressiveAccess: false,
        testCategory: 'B',
        vehicleGearbox: 'Manual',
        vehicleHeight: 5,
        vehicleLength: 10,
        vehicleSeats: 2,
        vehicleWidth: 2.5,
        welshTest: false,
      },
      candidate: {
        candidateAddress: {
          addressLine1: '999 Letsby Avenue',
          addressLine2: 'Someplace    ',
          addressLine3: 'Sometown',
          addressLine4: ' ',
          postcode: 'AB67 8CD',
        },
        candidateId: 104,
        candidateName: {
          firstName: 'Theresa',
          lastName: 'Shaw',
          title: 'Miss',
        },
        driverNumber: 'SHAWX885220A99HC',
        mobileTelephone: '07654 123456',
        emailAddress: 'therea@shaw.com',
      },
    },
    slotDetail: {
      duration: 57,
      slotId: `${end2endPracticeSlotId}_3`,
      start: todayAt8Am.add(67, 'minutes').format(),
    },
    testCentre: {
      centreId: 54321,
      centreName: 'Example Test Centre',
      costCode: 'EXTC1',
    },
    vehicleSlotType: 'B57mins',
    vehicleSlotTypeCode: 7,
  },
  {
    booking: {
      application: {
        applicationId: 1234571,
        bookingSequence: 2,
        checkDigit: 6,
        entitlementCheck: false,
        extendedTest: false,
        progressiveAccess: false,
        testCategory: 'B',
        vehicleGearbox: 'Automatic',
        vehicleHeight: 4,
        vehicleLength: 8.5,
        vehicleSeats: 20,
        vehicleWidth: 3.5,
        welshTest: false,
      },
      candidate: {
        candidateAddress: {
          addressLine1: '1 Station Street',
          addressLine2: 'Someplace',
          addressLine3: 'Somearea',
          addressLine4: 'Somecity',
          postcode: 'UB40 1AA',
        },
        candidateId: 105,
        candidateName: {
          firstName: 'Ali',
          lastName: 'Campbell',
          title: 'Mr',
        },
        driverNumber: 'CAMPB805220A89HC',
        mobileTelephone: '07654 123456',
        primaryTelephone: '01234 567890',
        emailAddress: 'ali@campbell.com',
      },
    },
    slotDetail: {
      duration: 57,
      slotId: `${end2endPracticeSlotId}_4`,
      start: todayAt8Am.add(57, 'minutes').format(),
    },
    testCentre: {
      centreId: 54321,
      centreName: 'Example Test Centre',
      costCode: 'EXTC1',
    },
    vehicleSlotType: 'B57mins',
    vehicleSlotTypeCode: 7,
  },
  {
    booking: {
      application: {
        applicationId: 1234572,
        bookingSequence: 1,
        checkDigit: 3,
        entitlementCheck: false,
        extendedTest: false,
        progressiveAccess: false,
        testCategory: 'B',
        vehicleGearbox: 'Manual',
        vehicleHeight: 5,
        vehicleLength: 15,
        vehicleSeats: 50,
        vehicleWidth: 2,
        welshTest: false,
      },
      candidate: {
        candidateAddress: {
          addressLine1: 'The Gables Cottage',
          addressLine2: 'Home Farm',
          addressLine3: 'Farm Road',
          addressLine4: 'Farm Area',
          addressLine5: 'Farmtown',
          postcode: 'FA43 9XY',
        },
        candidateId: 106,
        candidateName: {
          firstName: 'James',
          lastName: 'Brown',
          title: 'Mr',
        },
        driverNumber: 'BROWN915220A99HC',
        mobileTelephone: '07654 123456',
        primaryTelephone: '01234 567890',
        secondaryTelephone: '04321 098765',
        emailAddress: 'james@brown.com',
      },
    },
    slotDetail: {
      duration: 57,
      slotId: `${end2endPracticeSlotId}_5`,
      start: todayAt8Am.add(86, 'minutes').format(),
    },
    testCentre: {
      centreId: 54321,
      centreName: 'Example Test Centre',
      costCode: 'EXTC1',
    },
    vehicleSlotType: 'B57mins',
    vehicleSlotTypeCode: 7,
  },
  {
    booking: {
      application: {
        applicationId: 1234532,
        bookingSequence: 7,
        checkDigit: 7,
        entitlementCheck: false,
        extendedTest: false,
        progressiveAccess: false,
        testCategory: 'B',
        vehicleGearbox: 'Manual',
        welshTest: true,
      },
      candidate: {
        candidateAddress: {
          addressLine1: '1 Hangar Lane',
          addressLine2: 'Someplace',
          addressLine3: 'Sometown',
          postcode: 'AB78 9CD',
        },
        candidateId: 107,
        candidateName: {
          firstName: 'Jeremy',
          lastName: 'Craig',
          title: 'Captain',
        },
        driverNumber: 'CRAIG375220A99HC',
        primaryTelephone: '01234 567890',
        emailAddress: 'captain@jeremy.com',
      },
    },
    slotDetail: {
      duration: 57,
      slotId: `${end2endPracticeSlotId}_6`,
      start: todayAt8Am.add(58, 'minutes').format(),
    },
    testCentre: {
      centreId: 54321,
      centreName: 'Example Test Centre',
      costCode: 'EXTC1',
    },
    vehicleSlotType: 'B57mins',
    vehicleSlotTypeCode: 7,
  },
  {
    booking: {
      application: {
        applicationId: 1234532,
        bookingSequence: 7,
        checkDigit: 7,
        entitlementCheck: false,
        extendedTest: false,
        progressiveAccess: false,
        testCategory: 'B',
        vehicleGearbox: 'Manual',
        welshTest: true,
      },
      candidate: {
        candidateAddress: {
          addressLine1: '1 Hangar Lane',
          addressLine2: 'Someplace',
          addressLine3: 'Sometown',
          postcode: 'AB78 9CD',
        },
        candidateId: 107,
        candidateName: {
          firstName: 'Jeremy',
          lastName: 'Craig',
          title: 'Captain',
        },
        driverNumber: 'CRAIG375220A99HC',
        primaryTelephone: '01234 567890',
        emailAddress: 'captain@craig.com',
      },
    },
    slotDetail: {
      duration: 57,
      slotId: `${end2endPracticeSlotId}_7`,
      start: todayAt8Am.add(57, 'minutes').format(),
    },
    testCentre: {
      centreId: 54321,
      centreName: 'Example Test Centre',
      costCode: 'EXTC1',
    },
    vehicleSlotType: 'B57mins',
    vehicleSlotTypeCode: 7,
  },
];
