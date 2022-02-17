import { TestBed } from '@angular/core/testing';
import { SlotSelectorProvider } from '../slot-selector';
import { configureTestSuite } from 'ng-bullet';

describe('Slot Selector', () => {
  let slotSelector: SlotSelectorProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        SlotSelectorProvider,
      ],
    });
  });

  beforeEach(() => {
    slotSelector = TestBed.get(SlotSelectorProvider);
  });

  describe('SlotSelectorProvider', () => {
    it('should compile', () => {
      expect(slotSelector).toBeDefined();
    });
  });
});
