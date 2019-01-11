import { TestBed } from '@angular/core/testing';
import { SlotSelectorProvider } from '../slot-selector';
import { TestSlotComponent } from '../../../pages/journal/components/test-slot/test-slot';
import { SlotItem } from '../slot-item';
import { TravelSlotComponent } from '../../../pages/journal/components/travel-slot/travel-slot';

describe('Slot Selector', () => {
  let slotSelector: SlotSelectorProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SlotSelectorProvider,
      ]
    })
  });

  beforeEach(() => {
    slotSelector = TestBed.get(SlotSelectorProvider)
  });

  describe('Provider', () => {

    it('should compile', () => {
      expect(slotSelector).toBeDefined;
    });

    it('should return empty array if data is missing or incorrectly formatted', () => {
      expect(slotSelector.getSlotTypes([]).length).toBe(0);
      expect(slotSelector.getSlotTypes(null).length).toBe(0);
      expect(slotSelector.getSlotTypes(undefined).length).toBe(0);
    });

    it('should provide correct component when test type is B57mins', () => {
      const testSlot = {
        vehicleSlotType: 'B57Mins'
      };
      const journalSlots = [
        new SlotItem(testSlot, false)
      ];

      const response = slotSelector.getSlotTypes(journalSlots);

      expect(response.length).toBe(1);
      expect(response[0].component).toBe(TestSlotComponent);
      expect(response[0].slotData).toBe(testSlot);
      expect(response[0].hasSlotChanged).toBe(false)
    })

    it('should provide the TravelSlotComponent when the activityCode is 091', () => {
      const travelSlot = {
        activityCode: '091',
      };
      const journalSlots = [
        new SlotItem(travelSlot, false),
      ];

      const response = slotSelector.getSlotTypes(journalSlots);

      expect(response).toHaveLength(1);
      expect(response[0].component).toBe(TravelSlotComponent);
    });
  });
});
