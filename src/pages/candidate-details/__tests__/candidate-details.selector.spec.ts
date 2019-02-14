
import {
  getSlots,
  getSlotById,
  getTime,
  getCandidateName,
  getPhoneNumber,
  getSlotTypeView,
  getCity,
  isCandidateCommentsEmpty,
} from '../candidate-details.selector';
import { carStandardSlotType, carSpecialNeedsSlotType } from '../candidate-details.constants';

describe('Candidate Details Selector', () => {

  describe('getSlots', () => {
    it('returns the correct test slot array from the journal data', () => {
      const journal = {
        isLoading: false,
        lastRefreshed: new Date(0),
        slots: {
          '2019-01-17': [
            {
              hasSlotChanged: false,
              slotData: {
                vehicleSlotType: 'B57mins',
              },
            },
          ],
        },
        selectedDate: '2019-01-17',
      };

      const result = getSlots(journal);

      expect(result).toEqual([
        {
          vehicleSlotType: 'B57mins',
        },
      ]);
    });
  });

  describe('getSlotById', () => {
    it('returns the right slot after giving an id', () => {
      const selectedSlotId = 12345;
      const slots = [
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

      const result = getSlotById(slots, selectedSlotId);

      expect(result).toEqual({
        vehicleSlotType: 'B57mins',
        slotDetail: {
          slotId: 12345,
        },
      });
    });
  });

  describe('getTime', () => {
    it('returns the start time of the slot', () => {
      const slotStartTime = Date.now();
      const slot = {
        slotDetail: {
          start: slotStartTime,
        },
      };

      const result = getTime(slot);

      expect(result).toEqual(slotStartTime);
    });
  });

  describe('isCandidateCommentsEmpty', () => {
    it('returns true if the specialNeeds and previousCancellation are empty', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: '',
          },
          previousCancellation: [],
        },
      };

      const result = isCandidateCommentsEmpty(slot);

      expect(result).toBe(true);
    });

    it('returns false if the specialNeeds is provided', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: 'there are some special needs',
          },
          previousCancellation: [],
        },
      };

      const result = isCandidateCommentsEmpty(slot);

      expect(result).toBe(false);
    });

    it('returns false if the previousCancellation is not empty', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: '',
          },
          previousCancellation: [{ initiator: 'one' }],
        },
      };

      const result = isCandidateCommentsEmpty(slot);

      expect(result).toBe(false);
    });
  });

  describe('getCandidateName', () => {
    it('returns the combination of candidate name title, firstName and lastName', () => {
      const title = 'Miss';
      const firstName = 'Florence';
      const lastName = 'Pearson';
      const slot = {
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

      const result = getCandidateName(slot);

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
      const slot = {
        booking: {
          application: {
            specialNeeds: '',
          },
        },
      };

      const result = getSlotTypeView(slot);

      expect(result).toEqual(carStandardSlotType);
    });

    it('should return a double slot type when special needs are provided', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: 'Candidate has dyslexia',
          },
        },
      };

      const result = getSlotTypeView(slot);

      expect(result).toEqual(carSpecialNeedsSlotType);
    });
  });

  describe('getCity', () => {
    it('returns the right combination of address lines', () => {
      const cases = [
        {
          input: { addressLine1: '23 Canal str' },
          expected: '',
        },
        {
          input: { addressLine1: '23 Canal str', addressLine2: 'some place' },
          expected: 'some place',
        },
        {
          input: { addressLine1: '23 Canal str', addressLine2: 'some place', addressLine3: 'some other place' },
          expected: 'some place, some other place',
        },
        {
          input: {
            addressLine1: '23 Canal str',
            addressLine2: 'some place',
            addressLine3: 'some other place',
            addressLine4: 'here' },
          expected: 'some place, some other place, here',
        },
        {
          input: { addressLine1: '23 Canal str',
            addressLine2: 'some place',
            addressLine3: 'some other place',
            addressLine4: 'here',
            addressLine5: 'there' },
          expected: 'some place, some other place, here, there',
        },
      ];

      cases.map((c) => {
        const result = getCity(c.input);

        expect(result).toEqual(c.expected);
      });
    });
  });
});
