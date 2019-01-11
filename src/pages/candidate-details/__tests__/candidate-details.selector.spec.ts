
import { getTestSlots, getSlotById, getTime, getCandidateName, getPhoneNumber, getSlotTypeView, getCity } from '../candidate-details.selector';
import { carStandardSlotType, carSpecialNeedsSlotType } from '../candidate-details.constants';

describe('Candidate Details Selector', () => {

  describe('getTestSlots', () => {
    it('returns the correct test slot array from the journal data', () => {
      const journal = {
        isLoading: false,
        lastRefreshed: new Date(0),
        data: {
          testSlot: [
            {
              vehicleSlotType: 'B57mins',
            },
          ],
        },
        slots: [
          {
            hasSlotChanged: false,
            slotData: {}
          }
        ],
      };

      const result = getTestSlots(journal);

      expect(result).toEqual(journal.data.testSlot); 
    });
  });

  describe('getSlotById', () => {
    it('returns the right slot after giving an id', () => {
      const selectedSlotId = 12345;
      const testSlots = [
        {
          vehicleSlotType: 'B57mins',
          slotDetail: {
            slotId: selectedSlotId,
          },
        },
        {
          vehicleSlotType: 'A57mins',
          slotDetail: {
            slotId: 54321,
          },
        },
      ];

      const result = getSlotById(testSlots, selectedSlotId);

      expect(result).toEqual(testSlots[0]);
    });
  });

  describe('getTime', () => {
    it('returns the start time of the slot', () => {
      const testSlotStartTime = Date.now();
      const testSlot = {
        slotDetail: {
          start: testSlotStartTime,
        },
      };

      const result = getTime(testSlot);

      expect(result).toEqual(testSlotStartTime);
    });
  });

  describe('getCandidateName', () => {
    it('returns the combination of candidate name title, firstName and lastName', () => {
      const title = 'Miss';
      const firstName = 'Florence';
      const lastName = 'Pearson';
      const testSlot = {
        booking: {
          candidate: {
            candidateName: {
              title,
              firstName,
              lastName,
            },
          },
        },
      };

      const result = getCandidateName(testSlot);

      expect(result).toEqual(`${title} ${firstName} ${lastName}`);
    });
  });

  describe('getPhoneNumber', () => {
    const mobileTelephone = '12453643622';
    const primaryTelephone = '1254326236236';
    const secondaryTelephone = '32543622255452';
    it('returns mobileTelephone if it is provided', () => {
      const candidate = {
        mobileTelephone,
        primaryTelephone,
        secondaryTelephone,
      };

      const result = getPhoneNumber(candidate);

      expect(result).toEqual(mobileTelephone);
    });

    it('returns primaryTelephone if it is provided and mobileTelephone is not provided', () => {
      const candidate = {
        primaryTelephone,
        secondaryTelephone,
      };

      const result = getPhoneNumber(candidate);

      expect(result).toEqual(primaryTelephone);
    });

    it('returns secondaryTelephone if it is probided and mobileTelephone is not provided nor primaryTelephone', () => {
      const candidate = {
        secondaryTelephone,
      };

      const result = getPhoneNumber(candidate);

      expect(result).toEqual(secondaryTelephone);
    });

    it('returns No phone number provided if none of the phone numbers are provided', () => {
      const candidate = {};

      const result = getPhoneNumber(candidate);

      expect(result).toEqual('No phone number provided');
    });
  });

  describe('getSlotTypeView', () => {
    it('should return carStandardSlotType when no special needs is provided', () => {
      const testSlot = {
        booking: {
          application: {
            specialNeeds: '',
          },
        },
      };

      const result = getSlotTypeView(testSlot);

      expect(result).toEqual(carStandardSlotType);
    });

    it('should return a double slot type when special needs are provided', () => {
      const testSlot = {
        booking: {
          application: {
            specialNeeds: 'Candidate has dyslexia',
          },
        },
      };

      const result = getSlotTypeView(testSlot);

      expect(result).toEqual(carSpecialNeedsSlotType);
    });
  });

  describe('getCity', () => {
    it('returns empty string if not addressLine2,3,4,5 was provided', () => {
      const address = {
        addressLine1: '23 Canal str',
      };

      const result = getCity(address);

      expect(result).toEqual('');
    });

    it('returns adressLine2 if it is provided & addressLine3,4,5 are not', () => {
      const address = {
        addressLine1: '23 Canal str',
        addressLine2: 'some place',
      };

      const result = getCity(address);

      expect(result).toEqual('some place');
    });

    it('returns a concatenation of addressLine2,3 if they are provided & address4,5 are not', () => {
      const address = {
        addressLine1: '23 Canal str',
        addressLine2: 'some place',
        addressLine3: 'some other place'
      };

      const result = getCity(address);

      expect(result).toEqual('some place, some other place');
    });

    it('returns a concatenation of addressLine2,3,4 if they are provided & address5 is not', () => {
      const address = {
        addressLine1: '23 Canal str',
        addressLine2: 'some place',
        addressLine3: 'some other place',
        addressLine4: 'here'
      };

      const result = getCity(address);

      expect(result).toEqual('some place, some other place, here');
    });

    it('returns a concatenation of addressLine2,3,4,5 if they are provided', () => {
      const address = {
        addressLine1: '23 Canal str',
        addressLine2: 'some place',
        addressLine3: 'some other place',
        addressLine4: 'here',
        addressLine5: 'there',
      };

      const result = getCity(address);

      expect(result).toEqual('some place, some other place, here, there');
    });
  });

});
