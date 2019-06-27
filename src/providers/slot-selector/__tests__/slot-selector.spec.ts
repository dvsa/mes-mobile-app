import { TestBed } from '@angular/core/testing';
import { SlotSelectorProvider } from '../slot-selector';
import { TestSlotComponent } from '../../../pages/journal/components/test-slot/test-slot';
import { SlotItem } from '../slot-item';
import { ActivitySlotComponent } from '../../../pages/journal/components/activity-slot/activity-slot';
import { EmptySlotComponent } from '../../../pages/journal/components/empty-slot/empty-slot';

describe('Slot Selector', () => {
  let slotSelector: SlotSelectorProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SlotSelectorProvider,
      ],
    });
  });

  beforeEach(() => {
    slotSelector = TestBed.get(SlotSelectorProvider);
  });

  const singleSlotItemWithActivityCode = (code) => {
    const travelSlot = {
      activityCode: code,
    };
    const journalSlots = [
      new SlotItem(travelSlot, false),
    ];
    return journalSlots;
  };

  const expectNonTestActivitySlotComponentResolvedForActivityCode = (code) => {
    const journalSlots = singleSlotItemWithActivityCode(code);
    const response = slotSelector.getSlotTypes(journalSlots);
    expect(response[0].component).toBe(ActivitySlotComponent);
  };

  const singleSlotItemWithVehicleSlotType = (code):SlotItem[] => {
    const slot = {
      vehicleSlotType: code,
      booking: {
        application: {
          applicationId: '1234567',
        },
      },
    };
    const journalSlots = [
      new SlotItem(slot, false),
    ];
    return journalSlots;
  };

  const expectTestSlotComponentResolvedForVehicleSlotType = (code) => {
    const journalSlots = singleSlotItemWithVehicleSlotType(code);
    const response = slotSelector.getSlotTypes(journalSlots);

    expect(response.length).toBe(1);
    expect(response[0].component).toBe(TestSlotComponent);
    expect(response[0].slotData).toBe(journalSlots[0].slotData);
    expect(response[0].hasSlotChanged).toBe(false);
  };

  describe('SlotSelectorProvider', () => {

    it('should compile', () => {
      expect(slotSelector).toBeDefined();
    });

    describe('getSlotTypes', () => {
      it('should return empty array if data is missing or incorrectly formatted', () => {
        expect(slotSelector.getSlotTypes([]).length).toBe(0);
        expect(slotSelector.getSlotTypes(null).length).toBe(0);
        expect(slotSelector.getSlotTypes(undefined).length).toBe(0);
      });

      it('should provide correct component when test type is in vehicleSlotType codes', () => {
        expectTestSlotComponentResolvedForVehicleSlotType('B57mins');
        expectTestSlotComponentResolvedForVehicleSlotType('B86mins');
        expectTestSlotComponentResolvedForVehicleSlotType('B114mins');
        expectTestSlotComponentResolvedForVehicleSlotType('Voc90mins');
        expectTestSlotComponentResolvedForVehicleSlotType('HomeTest');
        expectTestSlotComponentResolvedForVehicleSlotType('ADI2-90mins');
        expectTestSlotComponentResolvedForVehicleSlotType('ADI3-90mins');
        expectTestSlotComponentResolvedForVehicleSlotType('CPCBUS30');
        expectTestSlotComponentResolvedForVehicleSlotType('M1Bike30m');
        expectTestSlotComponentResolvedForVehicleSlotType('M1BikSNX45m');
        expectTestSlotComponentResolvedForVehicleSlotType('M2Bike57min');
        expectTestSlotComponentResolvedForVehicleSlotType('M2BikSNEX86');
        expectTestSlotComponentResolvedForVehicleSlotType('M2BikeEx114');
        expectTestSlotComponentResolvedForVehicleSlotType('M1BikeEx30m');
        expectTestSlotComponentResolvedForVehicleSlotType('CPCLORRY30');
        expectTestSlotComponentResolvedForVehicleSlotType('OffRdTr30m');
        expectTestSlotComponentResolvedForVehicleSlotType('CPC30');
        expectTestSlotComponentResolvedForVehicleSlotType('Sc');
      });

      it('should provide the NonTestActivitySlotComponent for NTA activity codes', () => {
        expectNonTestActivitySlotComponentResolvedForActivityCode('091');
        expectNonTestActivitySlotComponentResolvedForActivityCode('094');
        expectNonTestActivitySlotComponentResolvedForActivityCode('096');
        expectNonTestActivitySlotComponentResolvedForActivityCode('142');
      });

      it('should provide the EmptySlotComponent for slots that have no booking or activity code', () => {
        const slot = {};
        const journalSlots = [
          new SlotItem(slot, false),
        ];
        const response = slotSelector.getSlotTypes(journalSlots);

        expect(response.length).toBe(1);
        expect(response[0].component).toBe(EmptySlotComponent);
        expect(response[0].slotData).toBe(journalSlots[0].slotData);
        expect(response[0].hasSlotChanged).toBe(false);
      });

    });
  });
  describe('isTestSlot', () => {
    it('should return true if test slot', () => {
      const response = slotSelector.isTestSlot(singleSlotItemWithVehicleSlotType(1)[0].slotData);
      expect(response).toEqual(true);
    });
    it('should return false if not a test slot', () => {
      const response = slotSelector.isTestSlot(
        singleSlotItemWithActivityCode(1)[0].slotData);
      expect(response).toEqual(false);
    });
  });
});
