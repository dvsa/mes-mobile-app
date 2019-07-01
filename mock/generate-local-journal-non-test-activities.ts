import * as enjoi from 'enjoi';
import * as joi from '@hapi/joi';
const journalSchema = require('@dvsa/mes-journal-schema/schema-examiner-work-schedule.json');
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';

const localNtas = {
  examiner: {
    staffNumber: '01234567',
    individualId: 9000000,
  },
  testSlots: [
    {
      slotDetail: {
        slotId: 1000,
        start: '2019-07-01T09:00:00',
        duration: 57,
      },
      vehicleSlotType: 'B57mins',
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC',
      },
    },
    {
      slotDetail: {
        slotId: 1001,
        start: '2019-07-01T10:15:00',
        duration: 57,
      },
      vehicleSlotType: 'B57mins',
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC',
      },
      booking: {
        candidate: {
          candidateId: 100,
          candidateName: {
            title: 'Miss',
            firstName: 'Aaa',
            lastName: 'Bbb',
          },
          driverNumber: 'AAAAA123456A78AA',
          gender: 'F',
          candidateAddress: {
            addressLine1: '1 Station Street',
            addressLine2: 'Someplace',
            addressLine3: '',
          },
          primaryTelephone: '01234 567890',
          secondaryTelephone: '04321 098765',
          mobileTelephone: '07654 123456',
          prn: 11223344,
          previousADITests: 2,
        },
        application: {
          applicationId: 1234567,
          bookingSequence: 3,
          checkDigit: 1,
          welshTest: false,
          extendedTest: true,
          meetingPlace: 'Some meeting place',
          progressiveAccess: false,
          specialNeeds: 'Some special needs',
          entitlementCheck: true,
          vehicleSeats: 5,
          vehicleHeight: 1.75,
          vehicleWidth: 2.5,
          vehicleLength: 5.5,
          testCategory: 'B+E',
          vehicleGearbox: 'Manual',
        },
        previousCancellation: [
          'Act of nature',
          'DSA',
          'DSA',
        ],
        business: {
          businessId: 1000,
          businessName: 'Daves Dodgy Driving Instructors',
          businessAddress: {
            addressLine1: 'Flat 1A',
            addressLine2: '1 Example Street',
            addressLine3: 'Example Area',
            addressLine4: 'Example Town',
            addressLine5: 'Example County',
            postcode: 'AB12 3CD',
          },
          telephone: '07890 654321',
        },
      },
    },
  ],
  personalCommitments: [
    {
      commitmentId: 123400,
      startDate: '2019-07-01',
      startTime: '10:00:00',
      endDate: '2019-07-01',
      endTime: '11:00:00',
      activityCode: '104',
      activityDescription: 'Medical appointment',
    },
    {
      commitmentId: 123401,
      startDate: '2019-07-08',
      endDate: '2019-07-08',
      activityCode: '081',
      activityDescription: 'Annual Leave',
    },
  ],
  nonTestActivities: [
    {
      slotDetail: {
        slotId: 1111,
        start: '2019-07-01T11:15:00',
        duration: 57,
      },
      activityCode: '091',
      activityDescription: 'Travel period to detached TC and/or outstation',
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC',
      },
    },
    {
      slotDetail: {
        slotId: 1110,
        start: '2019-07-01T12:15:00',
        duration: 57,
      },
      activityCode: '089',
      activityDescription: 'Management period',
      testCentre: {
        centreId: 65432,
        centreName: 'Example Test Centre 2',
        costCode: 'EXTC2',
      },
    },
    {
      slotDetail: {
        slotId: 1200,
        start: '2019-07-01T13:15:00',
        duration: 57,
      },
      activityCode: '104',
      activityDescription: 'Medical appointment',
      testCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC',
      },
    },
  ],
  advanceTestSlots: [
    {
      slotDetail: {
        slotId: 1300,
        start: '2019-07-01T09:00:00',
        duration: 90,
      },
      testCentre: {
        centreId: 76543,
        centreName: 'Example Test Centre 3',
        costCode: 'EXTC 3',
      },
      vehicleSlotType: 'Voc90mins',
    },
    {
      slotDetail: {
        slotId: 1301,
        start: '2019-07-01T10:45:00',
        duration: 90,
      },
      testCentre: {
        centreId: 76543,
        centreName: 'Example Test Centre 3',
        costCode: 'EXTC 3',
      },
      vehicleSlotType: 'Voc90mins',
    },
    {
      slotDetail: {
        slotId: 1302,
        start: '2019-07-01T12:30:00',
        duration: 90,
      },
      testCentre: {
        centreId: 76543,
        centreName: 'Example Test Centre 3',
        costCode: 'EXTC 3',
      },
      vehicleSlotType: 'Voc90mins',
    },
  ],
  deployments: [
    {
      deploymentId: 11111,
      testCentre: {
        centreId: 76543,
        centreName: 'Example Test Centre 3',
        costCode: 'EXTC 3',
      },
      date: '2019-07-01',
    },
    {
      deploymentId: 22222,
      testCentre: {
        centreId: 87654,
        centreName: 'Example Test Centre 4',
        costCode: 'EXTC 4',
      },
      date: '2019-07-01',
    },
  ],
};

const joiSchema = enjoi.schema(journalSchema);
const validationResult = joi.validate(localNtas, joiSchema);
if (validationResult.error) {
  console.log('Generated local NTA journal did not match journal schema');
  console.log(validationResult.error);
  process.exit(1);
}
// tslint:disable-next-line:max-line-length
writeFileSync(join(`${dirname(process.argv[1])}`, 'local-journal-non-test-activities.json'), JSON.stringify(localNtas, null, 2));
console.log('Local NTA journal updated');
