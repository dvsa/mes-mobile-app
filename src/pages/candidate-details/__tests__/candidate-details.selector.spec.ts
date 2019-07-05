import {
  getSlots,
  getSlotById,
  getTime,
  getCandidateName,
  getPhoneNumber,
  isCandidateCommentsEmpty,
  getCandidateId,
  isCandidateSpecialNeeds,
  isCandidateCheckNeeded,
  getSlotChanged,
  getSlotType,
  processSpecialNeeds,
  getBusiness,
} from '../candidate-details.selector';
import { SpecialNeedsCode } from '../candidate-details.constants';
import { SlotTypes } from '../../../shared/models/slot-types';

describe('Candidate Details Selector', () => {
  describe('processSpecialNeeds', () => {
    it('returns single item array for string.', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: 'there are some special needs',
          },
          previousCancellation: [],
        },
      };

      const result = processSpecialNeeds(slot);

      expect(result).toEqual(['there are some special needs']);
      expect(result.length).toBe(1);
    });
    it('returns multiple element array for semicolon seperated string', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: 'one;two;three',
          },
          previousCancellation: [],
        },
      };

      const result = processSpecialNeeds(slot);

      expect(result).toEqual(['one', 'two', 'three']);
      expect(result.length).toBe(3);
    });
    it('returns None string for falsey propery', () => {
      const slot = {
        booking: {
          application: {
          },
          previousCancellation: [],
        },
      };

      const result = processSpecialNeeds(slot);

      expect(result).toEqual('None');
    });
    it('returns None string for empty property', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: '',
          },
          previousCancellation: [],
        },
      };

      const result = processSpecialNeeds(slot);

      expect(result).toEqual('None');
    });
    it('returns None string for null property', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: null,
          },
          previousCancellation: [],
        },
      };

      const result = processSpecialNeeds(slot);

      expect(result).toEqual('None');
    });
  });

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
                vehicleTypeCode: 'C',
              },
            },
          ],
        },
        selectedDate: '2019-01-17',
        examiner: { staffNumber: '123', individualId: 456 },
      };

      const result = getSlots(journal);

      expect(result).toEqual([
        {
          vehicleTypeCode: 'C',
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

    it('returns false if the previousCancellation is not empty', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: '',
          },
          previousCancellation: ['Act of nature'],
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

  describe('getCandidateId', () => {
    it('returns a candidate id', () => {
      const candidateId = '12354567';
      const slot = {
        booking: {
          candidate: {
            candidateId,
          },
        },
      };
      const result = getCandidateId(slot);
      expect(result).toEqual('12354567');
    });
  });

  describe('isCandidateSpecialNeeds', () => {
    it('returns true if special needs exist', () => {
      const slot = {
        booking: {
          application: {
            specialNeeds: 'there are some special needs',
          },
          previousCancellation: [],
        },
      };
      const result = isCandidateSpecialNeeds(slot);
      expect(result).toBeTruthy();
    });
  });

  describe('getSlotType', () => {
    describe('vehicleSlotTypeCode is 6 and specialNeedsCode not NONE', () => {
      it('should return Single Slot (Special Needs)', () => {
        const slot = {
          vehicleSlotTypeCode: 6,
          booking: {
            application: {
              specialNeedsCode: SpecialNeedsCode.YES,
            },
          },
        };
        const result = getSlotType(slot);
        expect(result).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
      });
    });

    describe('vehicleSlotTypeCode is 14 and specialNeedsCode not NONE', () => {
      it('should return Single Slot (Special Needs)', () => {
        const slot = {
          vehicleSlotTypeCode: 14,
          booking: {
            application: {
              specialNeedsCode: SpecialNeedsCode.YES,
            },
          },
        };
        const result = getSlotType(slot);
        expect(result).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
      });
    });

    describe('specialNeedsExtendedTest is true', () => {
      const specialNeedsExtendedTest = true;

      describe('specialNeedsCode is NONE', () => {
        const specialNeedsCode = SpecialNeedsCode.NONE;

        it('should return Extended Test', () => {
          const slot = {
            booking: {
              application: {
                specialNeedsExtendedTest,
                specialNeedsCode,
              },
            },
          };
          const result = getSlotType(slot);
          expect(result).toBe(SlotTypes.EXTENDED_TEST);
        });
      });

      describe('specialNeedsCode is YES', () => {
        const specialNeedsCode = SpecialNeedsCode.YES;

        it('should return Extended Test Special Needs', () => {
          const slot = {
            booking: {
              application: {
                specialNeedsExtendedTest,
                specialNeedsCode,
              },
            },
          };
          const result = getSlotType(slot);
          expect(result).toBe(SlotTypes.EXTENDED_TEST_SPECIAL_NEEDS);
        });
      });

      describe('specialNeedsCode is EXTRA', () => {
        const specialNeedsCode = SpecialNeedsCode.EXTRA;

        it('should return Extended Test Special Needs', () => {
          const slot = {
            booking: {
              application: {
                specialNeedsExtendedTest,
                specialNeedsCode,
              },
            },
          };
          const result = getSlotType(slot);
          expect(result).toBe(SlotTypes.EXTENDED_TEST_SPECIAL_NEEDS);
        });
      });
    });

    describe('specialNeedsExtendedTest is false', () => {
      const specialNeedsExtendedTest = false;

      describe('specialNeedsCode is NONE', () => {
        const specialNeedsCode = SpecialNeedsCode.NONE;

        it('should return Standard Test', () => {
          const slot = {
            booking: {
              application: {
                specialNeedsExtendedTest,
                specialNeedsCode,
              },
            },
          };
          const result = getSlotType(slot);
          expect(result).toBe(SlotTypes.STANDARD_TEST);
        });
      });

      describe('specialNeedsCode is YES', () => {
        const specialNeedsCode = SpecialNeedsCode.YES;

        it('should return Standard Test', () => {
          const slot = {
            booking: {
              application: {
                specialNeedsExtendedTest,
                specialNeedsCode,
              },
            },
          };
          const result = getSlotType(slot);
          expect(result).toBe(SlotTypes.STANDARD_TEST);
        });
      });

      describe('specialNeedsCode is EXTRA', () => {
        const specialNeedsCode = SpecialNeedsCode.EXTRA;

        it('should return Special Needs Extra Time', () => {
          const slot = {
            booking: {
              application: {
                specialNeedsExtendedTest,
                specialNeedsCode,
              },
            },
          };
          const result = getSlotType(slot);
          expect(result).toBe(SlotTypes.SPECIAL_NEEDS_EXTRA_TIME);
        });
      });
    });
  });

  describe('isCandidateCheckNeeded', () => {
    it('returns true if entitlement check needed', () => {
      const slot = {
        booking: {
          application: {
            entitlementCheck: 'true',
          },
          previousCancellation: [],
        },
      };
      const result = isCandidateCheckNeeded(slot);
      expect(result).toBeTruthy();
    });
  });

  describe('getSlotChanged', () => {
    it('returns true if slot marked as changed', () => {
      const slot = {
        hasSlotChanged: true,
        booking: {
          application: {
            entitlementCheck: 'true',
          },
          previousCancellation: [],
        },
      };
      const result = getSlotChanged(slot);
      expect(result).toBeTruthy();
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

  describe('getBusiness', () => {
    it('should return the business', () => {
      const mockBusiness = {
        businessId: 1234,
        businessName: 'My Business',
      };

      const slot = {
        hasSlotChanged: true,
        booking: {
          application: {
            entitlementCheck: 'true',
          },
          previousCancellation: [],
          business: mockBusiness,
        },
      };

      expect(getBusiness(slot)).toEqual(mockBusiness);
    });
  });
});
