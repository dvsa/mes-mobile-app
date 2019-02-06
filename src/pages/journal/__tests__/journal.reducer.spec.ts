import { initialState, journalReducer } from '../journal.reducer';
import { LoadJournal, LoadJournalSuccess, UnloadJournal, UnsetError, ClearChangedSlot } from '../journal.actions';
import { SlotItem } from '../../../providers/slot-selector/slot-item';
import { DateTime } from '../../../common/date-time';

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
        error: {message: '', status: 0, statusText: ''}
      });
    });
  });

  describe('[JournalPage] Load Journal Success', () => {
    it('should toggle loading state and populate slots', () => {
      const actionPayload = {
        '2019-01-17': [{
          hasSlotChanged: false,
          slotData: {},
          }
        ],
      };
      const action = new LoadJournalSuccess(actionPayload);
      const result = journalReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        lastRefreshed: jasmine.any(Date),
        slots: {
          '2019-01-17': [{
            hasSlotChanged: false,
            slotData: {},
            }
          ],
        }
      });
    });
  });

  describe('[JournalPage] Unload Journal', () => {
    it('should clear the journal slots', () => {
      const stateWithJournals = { ...initialState, slots: { '2019-01-21': [new SlotItem({}, false)] } }
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
        const stateWithChangedSlot = { ...initialState, slots: {  [`${slotDate}`] : [new SlotItem({ slotDetail: {slotId:1234}}, true)] } };
        const action = new ClearChangedSlot(1234);
        const result = journalReducer(stateWithChangedSlot, action);
        expect(result.slots[slotDate][0].hasSlotChanged).toBeFalsy();

    })
  });
});
