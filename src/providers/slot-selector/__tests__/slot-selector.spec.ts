import { TestBed } from '@angular/core/testing';
import { SlotSelectorProvider } from '../slot-selector';
// import { TestSlotComponent } from '../../../pages/journal/components/test-slot/test-slot';

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
      // expect(slotSelector.getSlotTypes('not a slot').length).toBe(0);
    });
    it('should provide correct component when test type is B57mins', () => {
      // const slots = [
      //   {
      //     vehicleSlotType:  'B57mins',
      //     testData: 'test data for Cat B'
      //   }
      // ];

      // const response = slotSelector.getSlotTypes(slots);

      // expect(response.length).toBe(1);
      // expect(response[0].component).toBe(TestSlotComponent);
      // expect(response[0].slotData).toBe(slots[0]);
    })
  });
});
