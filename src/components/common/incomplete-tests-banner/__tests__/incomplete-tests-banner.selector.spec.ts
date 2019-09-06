import { DateTime } from '../../../../shared/helpers/date-time';
import { TestsModel } from '../../../../modules/tests/tests.model';
import { getIncompleteTestsCount } from '../incomplete-tests-banner.selector';
import { StoreModel } from '../../../../shared/models/store.model';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { JournalModel } from '../../../../pages/journal/journal.model';

describe('IncompleteTestsBannerSelector', () => {

  describe('getIncompleteTestsCount', () => {
    it('should get a count of incomplete tests', () => {
      const appInfo = {
        versionNumber: 'VERSION_NOT_LOADED',
        error: 'cordova_not_available',
      };
      const logs = [];
      const journal: JournalModel = {
        isLoading: true,
        lastRefreshed: new Date(0),
        slots: {
          ['2019-01-12']: [
            {
              hasSlotChanged: false,
              hasSeenCandidateDetails: false,
              slotData: {
                slotDetail: {
                  slotId: 1001,
                },
              },
            },
            {
              hasSlotChanged: false,
              hasSeenCandidateDetails: true,
              slotData: {
                slotDetail: {
                  slotId: 1003,
                },
              },
            },
          ],
          ['2019-01-13']: [
            {
              hasSlotChanged: false,
              hasSeenCandidateDetails: false,
              slotData: {
                slotDetail: {
                  slotId: 2001,
                },
              },
            },
          ],
          ['2019-01-14']: [
            {
              hasSlotChanged: false,
              hasSeenCandidateDetails: false,
              slotData: {
                slotDetail: {
                  slotId: 3001,
                },
              },
            },
          ],
        },
        selectedDate: '2019-01-14',
        examiner: { staffNumber: '123', individualId: 456 },
      };
      const tests: TestsModel = {
        currentTest: {
          slotId: '1003',
        },
        startedTests: {
          1003: {
            category: 'B',
            changeMarker: false,
            examinerBooked: 123,
            examinerConducted: 123,
            examinerKeyed: 123,
            vehicleDetails: {},
            accompaniment: {},
            testData: {
              dangerousFaults: {},
              drivingFaults: {},
              manoeuvres: {},
              seriousFaults: {},
              testRequirements: {},
              ETA: {},
              eco: {},
              vehicleChecks: {},
              eyesightTest: {},
            },
            activityCode: '28',
            journalData: {
              examiner: {
                staffNumber: '01234567',
                individualId: 9000000,
              },
              testCentre: {
                centreId: 54321,
                costCode: 'EXTC1',
                centreName: 'Example Test Centre',
              },
              testSlotAttributes: {
                welshTest: true,
                slotId: 1003,
                start: '2019-01-12T10:14:00',
                specialNeeds: false,
                specialNeedsArray: [
                  'None',
                ],
                vehicleTypeCode: 'C',
                extendedTest: false,
                examinerVisiting: false,
                previousCancellation: [
                  'DSA',
                  'Act of nature',
                ],
                entitlementCheck: false,
                slotType: 'Special Needs Extra Time',
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
                ethnicityCode: 'A',
              },
              applicationReference: {
                applicationId: 1234569,
                bookingSequence: 1,
                checkDigit: 9,
              },
            },
            rekey: false,
          },
        },
        testStatus: {
          1003: TestStatus.WriteUp,
        },
      };
      const store: StoreModel = { tests, journal, appInfo, logs };

      const count = getIncompleteTestsCount(store, DateTime.at('2019-01-14'));

      expect(count).toBe(3);
    });
  });

});
