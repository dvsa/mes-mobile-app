import { initialState, journalReducer } from '../journal.reducer';
import {
  LoadJournal,
  LoadJournalSuccess,
  UnloadJournal,
  UnsetError,
  ClearChangedSlot,
  CandidateDetailsSeen,
} from '../journal.actions';
import { SlotItem } from '../../../providers/slot-selector/slot-item';
import { ConnectionStatus } from '../../../providers/network-state/network-state';

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
    it('should toggle loading state and populate slots + examiner', () => {
      const actionPayload = {
        examiner: { staffNumber: '123', individualId: 456 },
        slotItemsByDate: {
          ['2019-01-13']: [{
            hasSlotChanged: false,
            slotData: {},
          },
          ],
        },
      };

      const action = new LoadJournalSuccess(
        actionPayload,
        ConnectionStatus.ONLINE,
        false,
        new Date(),
      );

      const state = {
        ...initialState,
        selectedDate: '2019-01-13',
      };

      const result = journalReducer(state, action);

      expect(result).toEqual({
        ...state,
        isLoading: false,
        lastRefreshed: jasmine.any(Date),
        slots: {
          ['2019-01-13']: [{
            hasSlotChanged: false,
            slotData: {},
          },
          ],
        },
        examiner: { staffNumber: '123', individualId: 456 },
      });
    });
  });

  describe('[JournalPage] Unload Journal', () => {
    it('should clear the journal slots', () => {
      const stateWithJournals = { ...initialState, slots: { ['2019-01-13']: [new SlotItem({}, false)] } };
      const action = new UnloadJournal();
      const result = journalReducer(stateWithJournals, action);
      expect(result.slots).toEqual({});
    });
    it('should reset the rest of the journal to default state', () => {
      const stateWithJournals = {
        isLoading: true,
        lastRefreshed: new Date(),
        selectedDate: 'dummy',
        slots: { ['2019-01-13']: [new SlotItem({}, false)] },
        examiner: { staffNumber: '123', individualId: 456 },
        checkComplete: [],
      };
      const action = new UnloadJournal();
      const result = journalReducer(stateWithJournals, action);
      expect(result.isLoading).toBe(false);
      expect(result.lastRefreshed).toBeNull();
      expect(result.selectedDate).toBe('');
      expect(result.examiner).toBeNull();
    });
  });

  describe('[JournalPage] Unset error', () => {
    it('should remove any journal error in the state', () => {
      const stateWithError = { ...initialState, error: { message: '', status: 0, statusText: '' } };
      const action = new UnsetError();
      const result = journalReducer(stateWithError, action);
      expect(result.error).toBeUndefined();
    });
  });

  describe('[JournalPage] Clear Changed Slot', () => {
    it('should clear hasChangedState flag on specified slot', () => {
      const slotDate = '2019-01-13';
      const stateWithChangedSlot = {
        ...initialState,
        selectedDate: slotDate,
        slots: {
          [`${slotDate}`]: [new SlotItem({ slotDetail: { slotId: 1234 } }, true)],
        },
      };
      const action = new ClearChangedSlot(1234);
      const result = journalReducer(stateWithChangedSlot, action);
      expect(result.slots[slotDate][0].hasSlotChanged).toEqual(false);

    });
  });

  describe('[JournalPage] Check Complete', () => {
    it('Candidate details was checked', () => {
      const slotDate = '2019-01-13';
      const stateWithChangedSlot = {
        ...initialState,
        selectedDate: slotDate,
        checkComplete: [],
      };
      const action = new CandidateDetailsSeen(1234);
      const result = journalReducer(stateWithChangedSlot, action);

      expect(result.checkComplete.length).toEqual(1);
      expect(result.checkComplete[0]).toEqual({
        slotId: 1234,
      });

    });
  });
});
