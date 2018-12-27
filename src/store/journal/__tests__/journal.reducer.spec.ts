import { initialState, journalReducer } from '../journal.reducer';
import { LoadJournal, LoadJournalSuccess } from '../journal.actions';

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
        isLoading: true
      });
    });
  });

  describe('[JournalPage] Load Journal Success', () => {
    it('should toggle loading state', () => {

      const action = new LoadJournalSuccess({ testJournal: true });
      const result = journalReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        testSlot: { 'testJournal': true }
      });
    });
  });

});
