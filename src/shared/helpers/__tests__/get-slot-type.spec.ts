import { getSlotType, SpecialNeedsCode } from '../get-slot-type';
import { SlotTypes } from '../../models/slot-types';

describe('getSlotType', () => {

  it('should return Single slot special needs when slot type code is 6', () => {
    const slotData = {
      booking: {
        application: {
          specialNeedsExtendedTest: false,
          specialNeedsCode: SpecialNeedsCode.YES,
        },
      },
      vehicleSlotTypeCode: 6,
    };

    const result = getSlotType(slotData);

    expect(result).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
  });

  it('should return Single slot special needs when slot type code is 14', () => {
    const slotData = {
      booking: {
        application: {
          specialNeedsExtendedTest: false,
          specialNeedsCode: SpecialNeedsCode.YES,
        },
      },
      vehicleSlotTypeCode: 14,
    };

    const result = getSlotType(slotData);

    expect(result).toBe(SlotTypes.SINGLE_SLOT_SPECIAL_NEEDS);
  });

  it('should return Extended test', () => {
    const slotData = {
      booking: {
        application: {
          specialNeedsExtendedTest: true,
          specialNeedsCode: SpecialNeedsCode.NONE,
        },
      },
      vehicleSlotTypeCode: 14,
    };

    const result = getSlotType(slotData);

    expect(result).toBe(SlotTypes.EXTENDED_TEST);
  });

  it('should return Extended test special needs', () => {
    const slotData = {
      booking: {
        application: {
          specialNeedsExtendedTest: true,
          specialNeedsCode: SpecialNeedsCode.YES,
        },
      },
      vehicleSlotTypeCode: 13,
    };

    const result = getSlotType(slotData);

    expect(result).toBe(SlotTypes.EXTENDED_TEST_SPECIAL_NEEDS);
  });

  it('should return Standard test when special needs code is none', () => {
    const slotData = {
      booking: {
        application: {
          specialNeedsExtendedTest: false,
          specialNeedsCode: SpecialNeedsCode.NONE,
        },
      },
      vehicleSlotTypeCode: 13,
    };

    const result = getSlotType(slotData);

    expect(result).toBe(SlotTypes.STANDARD_TEST);
  });

  it('should return Standard test when special needs code is yes', () => {
    const slotData = {
      booking: {
        application: {
          specialNeedsExtendedTest: false,
          specialNeedsCode: SpecialNeedsCode.NONE,
        },
      },
      vehicleSlotTypeCode: 13,
    };

    const result = getSlotType(slotData);

    expect(result).toBe(SlotTypes.STANDARD_TEST);
  });

  it('should return Special needs extra time', () => {
    const slotData = {
      booking: {
        application: {
          specialNeedsExtendedTest: false,
          specialNeedsCode: SpecialNeedsCode.EXTRA,
        },
      },
      vehicleSlotTypeCode: 13,
    };

    const result = getSlotType(slotData);

    expect(result).toBe(SlotTypes.SPECIAL_NEEDS_EXTRA_TIME);
  });

});
