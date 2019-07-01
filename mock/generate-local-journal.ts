import { ExaminerWorkSchedule } from '@dvsa/mes-journal-schema/Journal';
import * as enjoi from 'enjoi';
import * as joi from '@hapi/joi';
const journalSchema = require('@dvsa/mes-journal-schema/schema-examiner-work-schedule.json');
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { getTodayAsIsoDate, getNextWorkingDayAsIsoDate } from './mock-date-utils';

const today = getTodayAsIsoDate();
// For unit tests to pass, the local-journal.json file must include one test slot for the next working day.
const nextWorkingDay = getNextWorkingDayAsIsoDate();

const localJournal: ExaminerWorkSchedule = {
  examiner: {
    staffNumber: '01234567',
    individualId: 9000000,
  },
  nonTestActivities: [],
  testSlots: [
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
          testCategory: 'A1',
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
          gender: 'F',
          mobileTelephone: '07654 123456',
          primaryTelephone: '01234 567890',
          secondaryTelephone: '04321 098765',
          dateOfBirth: '1983-09-27',
          ethnicOriginCode: 1271,
        },
        previousCancellation: [
          'Act of nature',
        ],
      },
      slotDetail: {
        duration: 57,
        slotId: 1001,
        start: `${today}T08:10:00`,
      },
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC1',
      },
      vehicleSlotType: 'Voc90mins',
      examinerVisiting: false,
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
          gender: 'F',
          mobileTelephone: '07654 123456',
          emailAddress: 'test@test.com',
          dateOfBirth: '1979-10-20',
          ethnicOriginCode: 1272,
        },
        previousCancellation: [
          'DSA',
          'Act of nature',
        ],
      },
      slotDetail: {
        duration: 57,
        slotId: 1003,
        start: `${today}T10:14:00`,
      },
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC1',
      },
      vehicleSlotType: 'B57mins',
      vehicleSlotTypeCode: 7,
      examinerVisiting: false,
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
          testCategory: 'C1+E',
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
          gender: 'F',
          mobileTelephone: '07654 123456',
          dateOfBirth: '1959-11-16',
          ethnicOriginCode: 1273,
        },
      },
      slotDetail: {
        duration: 57,
        slotId: 1004,
        start: `${today}T11:11:00`,
      },
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC1',
      },
      vehicleSlotType: 'B57mins',
      vehicleSlotTypeCode: 7,
      examinerVisiting: false,
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
          gender: 'M',
          mobileTelephone: '07654 123456',
          primaryTelephone: '01234 567890',
          dateOfBirth: '1975-06-09',
          ethnicOriginCode: 1274,
        },
      },
      slotDetail: {
        duration: 57,
        slotId: 1005,
        start: `${today}T12:38:00`,
      },
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC1',
      },
      vehicleSlotType: 'B57mins',
      vehicleSlotTypeCode: 7,
      examinerVisiting: false,
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
          testCategory: 'D+E',
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
          gender: 'M',
          mobileTelephone: '07654 123456',
          primaryTelephone: '01234 567890',
          secondaryTelephone: '04321 098765',
          dateOfBirth: '1950-02-27',
          ethnicOriginCode: 1275,
        },
      },
      slotDetail: {
        duration: 57,
        slotId: 1006,
        start: `${today}T13:35:00`,
      },
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC1',
      },
      vehicleSlotType: 'B57mins',
      vehicleSlotTypeCode: 7,
      examinerVisiting: false,
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
          gender: 'M',
          primaryTelephone: '01234 567890',
          dateOfBirth: '1973-09-06',
          ethnicOriginCode: 1276,
        },
      },
      slotDetail: {
        duration: 57,
        slotId: 1007,
        start: `${nextWorkingDay}T14:32:00`,
      },
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC1',
      },
      vehicleSlotType: 'B57mins',
      vehicleSlotTypeCode: 7,
      examinerVisiting: false,
    },
  ],
};

const joiSchema = enjoi.schema(journalSchema);
const validationResult = joi.validate(localJournal, joiSchema);
if (validationResult.error) {
  console.log('Generated local journal did not match journal schema');
  console.log(validationResult.error);
  process.exit(1);
}
writeFileSync(join(`${dirname(process.argv[1])}`, 'local-journal.json'), JSON.stringify(localJournal, null, 2));
console.log('Local journal updated');
