import * as moment from 'moment';
import { SlotItem } from '../../../providers/slot-selector/slot-item';

// import * as journalData from '../../../assets/mock/local-journal.json';

// const slots1:{[k: string]: SlotItem[]} = {
//   [moment().format('YYYY-MM-DD')]: journalData.testSlot
// };

const slots2: {[k: string]: SlotItem[]} = {
  [moment().format('YYYY-MM-DD')]: [
    {
      hasSlotChanged: false,
      slotData: {
        slotDetail: {
          slotId: 1001,
          start: moment().format(),
          duration: 57,
        },
        vehicleSlotType: 'B57mins',
        testCentre: {
          centreId: 54321,
          centreName: 'Example Test Centre',
          costCode: 'EXTC1',
        },
        booking: {
          candidate: {
            candidateId: 101,
            age: 17,
            candidateName: {
              title: 'Miss',
              firstName: 'Florence',
              lastName: 'Pearson',
            },
            driverNumber: 'PEARS015220A99HC',
            gender: 'Female',
            candidateAddress: {
              addressLine1: '1 Station Street',
              addressLine2: 'Someplace',
              addressLine3: 'Sometown',
              addressLine4: '',
              addressLine5: '',
              postcode: 'AB12 3CD',
            },
            primaryTelephone: '01234 567890',
            secondaryTelephone: '04321 098765',
            mobileTelephone: '07654 123456',
          },
          application: {
            applicationId: 1234567,
            bookingSequence: 3,
            checkDigits: 1,
            welshTest: false,
            extendedTest: false,
            meetingPlace: '',
            progressiveAccess: false,
            specialNeeds: 'Candidate has dyslexia',
            entitlementCheck: false,
            vehicleSeats: null,
            vehicleHeight: null,
            vehicleWidth: null,
            vehicleLength: null,
            testCategory: 'B',
            vehicleGearbox: 'Manual',
          },
          previousCancellation: [
            {
              initiator: 'Act of nature',
            },
          ],
        },
      },
    },
    {
      hasSlotChanged: false,
      slotData: {
        slotDetail: {
          slotId: 1002,
          start: moment().format(),
          duration: 57,
        },
        vehicleSlotType: 'B57mins',
        testCentre: {
          centreId: 54321,
          centreName: 'Example Test Centre',
          costCode: 'EXTC1',
        },
        booking: {
          candidate: {
            candidateId: 102,
            age: 22,
            candidateName: {
              title: 'Mr',
              firstName: 'Kamil',
              lastName: 'Zielinski',
            },
            driverNumber: 'ZIELI965220A99HC',
            gender: 'Male',
            candidateAddress: {
              addressLine1: '10 High Street',
              addressLine2: 'Someplace',
              addressLine3: 'Sometown',
              addressLine4: '',
              addressLine5: '',
              postcode: 'AB34 5CD',
            },
            primaryTelephone: '01234 567890',
            mobileTelephone: '07654 123456',
          },
          application: {
            applicationId: 1234568,
            bookingSequence: 1,
            checkDigits: 4,
            welshTest: false,
            extendedTest: false,
            meetingPlace: '',
            progressiveAccess: false,
            specialNeeds: '',
            entitlementCheck: false,
            vehicleSeats: null,
            vehicleHeight: null,
            vehicleWidth: null,
            vehicleLength: null,
            testCategory: 'B',
            vehicleGearbox: 'Manual',
          },
        },
      },
    },
    {
      hasSlotChanged: false,
      slotData: {
        slotDetail: {
          slotId: 1003,
          start: moment().format(),
          duration: 57,
        },
        vehicleSlotType: 'B57mins',
        testCentre: {
          centreId: 54321,
          centreName: 'Example Test Centre',
          costCode: 'EXTC1',
        },
        booking: {
          candidate: {
            candidateId: 103,
            age: 56,
            candidateName: {
              title: 'Mrs',
              firstName: 'Jane',
              lastName: 'Doe',
            },
            driverNumber: 'DOEXX625220A99HC',
            gender: 'Female',
            candidateAddress: {
              addressLine1: 'My House',
              addressLine2: 'Someplace',
              addressLine3: 'Sometown',
              addressLine4: '',
              addressLine5: '',
              postcode: 'AB45 6CD',
            },
            mobileTelephone: '07654 123456',
          },
          application: {
            applicationId: 1234569,
            bookingSequence: 1,
            checkDigits: 9,
            welshTest: false,
            extendedTest: false,
            meetingPlace: '',
            progressiveAccess: false,
            specialNeeds: '',
            entitlementCheck: false,
            vehicleSeats: null,
            vehicleHeight: null,
            vehicleWidth: null,
            vehicleLength: null,
            testCategory: 'B',
            vehicleGearbox: 'Manual',
          },
          previousCancellation: [
            {
              initiator: 'DSA',
            },
            {
              initiator: 'Act of nature',
            },
          ],
        },
      },
    },
    {
      hasSlotChanged: false,
      slotData: {
        slotDetail: {
          slotId: 1004,
          start: moment().format(),
          duration: 57,
        },
        vehicleSlotType: 'B57mins',
        testCentre: {
          centreId: 54321,
          centreName: 'Example Test Centre',
          costCode: 'EXTC1',
        },
        booking: {
          candidate: {
            candidateId: 104,
            age: 30,
            candidateName: {
              title: 'Miss',
              firstName: 'Tracy',
              lastName: 'Shaw',
            },
            driverNumber: 'SHAWX885220A99HC',
            gender: 'Female',
            candidateAddress: {
              addressLine1: '999 Letsby Avenue',
              addressLine2: 'Someplace',
              addressLine3: 'Sometown',
              addressLine4: '',
              addressLine5: '',
              postcode: 'AB67 8CD',
            },
            mobileTelephone: '07654 123456',
          },
          application: {
            applicationId: 1234570,
            bookingSequence: 2,
            checkDigits: 2,
            welshTest: false,
            extendedTest: false,
            meetingPlace: '',
            progressiveAccess: false,
            specialNeeds: '',
            entitlementCheck: false,
            vehicleSeats: null,
            vehicleHeight: null,
            vehicleWidth: null,
            vehicleLength: null,
            testCategory: 'B',
            vehicleGearbox: 'Manual',
          },
        },
      },
    },
    {
      hasSlotChanged: false,
      slotData: {
        slotDetail: {
          slotId: 1005,
          start: moment().format(),
          duration: 57,
        },
        vehicleSlotType: 'B57mins',
        testCentre: {
          centreId: 54321,
          centreName: 'Example Test Centre',
          costCode: 'EXTC1',
        },
        booking: {
          candidate: {
            candidateId: 105,
            age: 38,
            candidateName: {
              title: 'Mr',
              firstName: 'Ali',
              lastName: 'Campbell',
            },
            driverNumber: 'CAMPB805220A89HC',
            gender: 'Male',
            candidateAddress: {
              addressLine1: '1 Station Street',
              addressLine2: 'Someplace',
              addressLine3: 'Somearea',
              addressLine4: 'Somecity',
              addressLine5: '',
              postcode: 'UB40 1AA',
            },
            primaryTelephone: '01234 567890',
            mobileTelephone: '07654 123456',
          },
          application: {
            applicationId: 1234571,
            bookingSequence: 2,
            checkDigits: 6,
            welshTest: false,
            extendedTest: false,
            meetingPlace: '',
            progressiveAccess: false,
            specialNeeds: '',
            entitlementCheck: false,
            vehicleSeats: null,
            vehicleHeight: null,
            vehicleWidth: null,
            vehicleLength: null,
            testCategory: 'B',
            vehicleGearbox: 'Manual',
          },
        },
      },
    },
    {
      hasSlotChanged: false,
      slotData: {
        slotDetail: {
          slotId: 1006,
          start: moment().format(),
          duration: 57,
        },
        vehicleSlotType: 'B57mins',
        testCentre: {
          centreId: 54321,
          centreName: 'Example Test Centre',
          costCode: 'EXTC1',
        },
        booking: {
          candidate: {
            candidateId: 106,
            age: 27,
            candidateName: {
              title: 'Mr',
              firstName: 'James',
              lastName: 'Brown',
            },
            driverNumber: 'BROWN915220A99HC',
            gender: 'Male',
            candidateAddress: {
              addressLine1: 'The Gables Cottage',
              addressLine2: 'Home Farm',
              addressLine3: 'Farm Road',
              addressLine4: 'Farm Area',
              addressLine5: 'Farmtown',
              postcode: 'FA43 9XY',
            },
            primaryTelephone: '01234 567890',
            secondaryTelephone: '04321 098765',
            mobileTelephone: '07654 123456',
          },
          application: {
            applicationId: 1234572,
            bookingSequence: 1,
            checkDigits: 3,
            welshTest: false,
            extendedTest: false,
            meetingPlace: '',
            progressiveAccess: false,
            specialNeeds: '',
            entitlementCheck: false,
            vehicleSeats: null,
            vehicleHeight: null,
            vehicleWidth: null,
            vehicleLength: null,
            testCategory: 'B',
            vehicleGearbox: 'Manual',
          },
        },
      },
    },
    {
      hasSlotChanged: false,
      slotData: {
        slotDetail: {
          slotId: 1007,
          start: moment().format(),
          duration: 57,
        },
        vehicleSlotType: 'B57mins',
        testCentre: {
          centreId: 54321,
          centreName: 'Example Test Centre',
          costCode: 'EXTC1',
        },
        booking: {
          candidate: {
            candidateId: 107,
            age: 81,
            candidateName: {
              title: 'Captain',
              firstName: 'Montague',
              lastName: 'Smythe',
            },
            driverNumber: 'SMYTH375220A99HC',
            gender: 'Male',
            candidateAddress: {
              addressLine1: '1 Hangar Lane',
              addressLine2: 'Someplace',
              addressLine3: 'Sometown',
              addressLine4: '',
              addressLine5: '',
              postcode: 'AB78 9CD',
            },
            primaryTelephone: '01234 567890',
          },
          application: {
            applicationId: 1234573,
            bookingSequence: 7,
            checkDigits: 7,
            welshTest: false,
            extendedTest: false,
            meetingPlace: '',
            progressiveAccess: false,
            specialNeeds: '',
            entitlementCheck: false,
            vehicleSeats: null,
            vehicleHeight: null,
            vehicleWidth: null,
            vehicleLength: null,
            testCategory: 'B',
            vehicleGearbox: 'Manual',
          },
        },
      },
    }
  ]
}

export default slots2;