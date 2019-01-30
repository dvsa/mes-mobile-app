import { TestBed } from '@angular/core/testing';
import { SlotSelectorProvider } from '../slot-selector';
import { TestSlotComponent } from '../../../pages/journal/components/test-slot/test-slot';
import { SlotItem } from '../slot-item';
import { ActivitySlotComponent } from '../../../pages/journal/components/activity-slot/activity-slot';

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

  const singleSlotItemWithActivityCode = (code) => {
    const travelSlot = {
      activityCode: code,
    };
    const journalSlots = [
      new SlotItem(travelSlot, false),
    ];
    return journalSlots;
  }

  const expectNonTestActivitySlotComponentResolvedForActivityCode = (code) => {
    const journalSlots = singleSlotItemWithActivityCode(code);
    const response = slotSelector.getSlotTypes(journalSlots);
    expect(response[0].component).toBe(ActivitySlotComponent);
  }

  describe('SlotSelectorProvider', () => {

    it('should compile', () => {
      expect(slotSelector).toBeDefined;
    });

    describe('getSlotTypes', () => {
      it('should return empty array if data is missing or incorrectly formatted', () => {
        expect(slotSelector.getSlotTypes([]).length).toBe(0);
        expect(slotSelector.getSlotTypes(null).length).toBe(0);
        expect(slotSelector.getSlotTypes(undefined).length).toBe(0);
      });

      it('should provide correct component when test type is B57mins', () => {
        const slot = {
          vehicleSlotType: 'B57mins'
        };
        const journalSlots = [
          new SlotItem(slot, false)
        ];

        const response = slotSelector.getSlotTypes(journalSlots);

        expect(response.length).toBe(1);
        expect(response[0].component).toBe(TestSlotComponent);
        expect(response[0].slotData).toBe(slot);
        expect(response[0].hasSlotChanged).toBe(false)
      });

      it('should provide the NonTestActivitySlotComponent for NTA activity codes', () => {
        expectNonTestActivitySlotComponentResolvedForActivityCode('091');
        expectNonTestActivitySlotComponentResolvedForActivityCode('094');
        expectNonTestActivitySlotComponentResolvedForActivityCode('096');
        expectNonTestActivitySlotComponentResolvedForActivityCode('142');
      });
    });
  });
});
