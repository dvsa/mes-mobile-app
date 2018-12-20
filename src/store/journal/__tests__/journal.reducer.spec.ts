import { initialState, journalReducer } from '../journal.reducer';
import { LoadJournal, LoadJournalSuccess } from '../journal.actions';

describe('Journal Reducer', () => {

  // const testJournal = {
  //   'staffNumber': 12345,
  //   'examinerName': {
  //     'title': 'Mr',
  //     'firstName': 'Joe',
  //     'secondName': 'Frederic',
  //     'thirdName': 'Englbert',
  //     'lastName': 'Bloggs'
  //   },
  //   'permTestCentre': { 'centreId': 54321, 'centreName': 'Example Test Centre', 'costCode': 'EXTC1' },
  //   'testSlot': [{
  //     'slotDetail': { 'slotId': 1001, 'start': '2018-12-10T08:10:00+00:00', 'duration': 57 },
  //     'vehicleSlotType': 'B57mins',
  //     'testCentre': { 'centreId': 54321, 'centreName': 'Example Test Centre', 'costCode': 'EXTC1' },
  //     'booking': {
  //       'candidate': {
  //         'candidateId': 101,
  //         'age': 17,
  //         'candidateName': { 'title': 'Miss', 'firstName': 'Florence', 'lastName': 'Pearson' },
  //         'driverNumber': 'PEARS015220A99HC',
  //         'gender': 'Female',
  //         'candidateAddress': {
  //           'addressLine1': '1 Station Street',
  //           'addressLine2': 'Someplace',
  //           'addressLine3': 'Sometown',
  //           'addressLine4': '',
  //           'addressLine5': '',
  //           'postcode': 'AB12 3CD'
  //         },
  //         'primaryTelephone': '01234 567890',
  //         'secondaryTelephone': '04321 098765',
  //         'mobileTelephone': '07654 123456'
  //       },
  //       'application': {
  //         'applicationId': 1234567,
  //         'bookingSequence': 3,
  //         'checkDigits': 1,
  //         'welshTest': false,
  //         'extendedTest': false,
  //         'meetingPlace': '',
  //         'progressiveAccess': false,
  //         'specialNeeds': 'Candidate has dyslexia',
  //         'entitlementCheck': false,
  //         'testCategory': 'B',
  //         'vehicleGearbox': 'Manual'
  //       },
  //       'previousCancellation': [{ 'initiator': 'Act of nature' }]
  //     }
  //   }
  //   ]
  // };

  describe('[Main] Load Journal', () => {
    it('should toggle loading state', () => {
      const action = new LoadJournal();
      const result = journalReducer(initialState.journal, action);

      expect(result).toEqual({
        ...initialState.journal,
        isLoading: true
      });
    });
  });

  // describe('[Main] Load Journal Success', () => {
  //   it('should toggle loading state', () => {
  //
  //     const action = new LoadJournalSuccess({testJournal});
  //     const result = journalReducer(initialState.journal, action);
  //
  //     expect(result).toEqual({
  //       ...initialState.journal,
  //       isLoading: false
  //     });
  //   });
  // });

});
