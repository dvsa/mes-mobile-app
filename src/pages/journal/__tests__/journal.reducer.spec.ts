import { initialState, journalReducer } from '../journal.reducer';
import { LoadJournal, LoadJournalSuccess, UnloadJournal, UnsetError, ClearChangedSlot } from '../journal.actions';
import { SlotItem } from '../../../providers/slot-selector/slot-item';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { ConnectionStatus } from '../../../providers/network-state/network-state';

const today = DateTime.now().format('YYYY-MM-DD');

describe('Journal Reducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = journalReducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[JournalPage] Load Journal', () => {
    it('should toggle loading state', () => {
      const action = new LoadJournal();
      const result = journalReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: true,
        error: { message: '', status: 0, statusText: '' },
      });
    });
  });

  describe('[JournalPage] Load Journal Success', () => {
    it('should toggle loading state and populate slots', () => {
      const actionPayload = {
        [`${today}`]: [{
          hasSlotChanged: false,
          slotData: {},
        },
        ],
      };
      const action = new LoadJournalSuccess(actionPayload,
                                            ConnectionStatus.ONLINE,
                                            new Date());
      const result = journalReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        lastRefreshed: jasmine.any(Date),
        slots: {
          [`${today}`]: [{
            hasSlotChanged: false,
            slotData: {},
          },
          ],
        },
      });
    });

    it('should set the selected date to today if it was yesterday', () => {
      const yesterday = DateTime.now().add(-1, Duration.DAY).format('YYYY-MM-DD');
      const actionPayload = {
        [`${today}`]: [{
          hasSlotChanged: false,
          slotData: {},
        },
        ],
      };
      const stateWithYesterdaysDate = {
        ...initialState,
        slots: {
          [`${yesterday}`] : [new SlotItem({ slotDetail: { slotId:1234 } }, true)],
        },
        selectedDate: yesterday,
      };
      const action = new LoadJournalSuccess(actionPayload,
                                            ConnectionStatus.ONLINE,
                                            new Date());
      const result = journalReducer(stateWithYesterdaysDate, action);
      expect(result.selectedDate).toEqual(today);
    });
  });

  describe('[JournalPage] Unload Journal', () => {
    it('should clear the journal slots', () => {
      const stateWithJournals = { ...initialState, slots: { [`${today}`]: [new SlotItem({}, false)] } };
      const action = new UnloadJournal();
      const result = journalReducer(stateWithJournals, action);
      expect(result.slots).toEqual({});
    });
  });

  describe('[JournalPage] Unset error', () => {
    it('should remove any journal error in the state', () => {
      const stateWithError = { ...initialState, error: { message: '', status: 0, statusText: '' }  };
      const action = new UnsetError();
      const result = journalReducer(stateWithError, action);
      expect(result.error).toBeUndefined();
    });
  });

  describe('[JournalPage] Clear Changed Slot', () => {
    it('should clear hasChangedState flag on specified slot', () => {
      const slotDate = DateTime.now().format('YYYY-MM-DD');
      const stateWithChangedSlot = {
        ...initialState,
        slots: {
          [`${slotDate}`] : [new SlotItem({ slotDetail: { slotId:1234 } }, true)],
        },
      };
      const action = new ClearChangedSlot(1234);
      const result = journalReducer(stateWithChangedSlot, action);
      expect(result.slots[slotDate][0].hasSlotChanged).toBeFalsy();

    });
  });
});
