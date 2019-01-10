import newSlotsDetectingChanges from '../newSlotsDetectingChanges';

describe('newSlotsDetectingChanges', () => {

  let oldSlots;
  let newJournal;
  let oldSlotItems;
  
  beforeEach(() => {
    oldSlots = [
      {
        slotDetail: {
          slotId: 1001,
          start: '2018-12-10T08:10:00+00:00',
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
    ];

    newJournal = {
      staffNumber: 12345,
      examinerName: {
        title: 'Mr',
        firstName: 'Joe',
        secondName: 'Frederic',
        thirdName: 'Englbert',
        lastName: 'Bloggs',
      },
      permTestCentre: {
        centreId: 54321,
        centreName: 'Example Test Centre',
        costCode: 'EXTC1',
      },
      testSlot: [
        {
          slotDetail: {
            slotId: 1001,
            start: '2018-12-10T08:10:00+00:00',
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
      ],
    }
    oldSlotItems = oldSlots.map(oldSlot => ({ slotData: oldSlot }))
  });

  describe('when there are no slots in the new journal', () => {
    it('should return a blank array', () => {
      const result = newSlotsDetectingChanges([], { testSlot: []})     
      expect(result).toHaveLength(0);
    });
  });

  describe('when the old slots match the new slots exactly', () => {
    it('should produce the new slot items indicating there was no change', () => {
      const result = newSlotsDetectingChanges(oldSlotItems, newJournal)
      expect(result).toHaveLength(1);
      expect(result[0].hasSlotChanged).toBe(false)
    });
  });

  describe('when the old slots differ from the new slots', () => {
    it('should produce the new slot items indicating there was a change', () => {
      newJournal.testSlot[0].booking.candidate.driverNumber = 'NEWDRIVERNUMBER';
      const result = newSlotsDetectingChanges(oldSlotItems, newJournal)
      expect(result).toHaveLength(1);
      expect(result[0].hasSlotChanged).toBe(true)
    });
  });
});
