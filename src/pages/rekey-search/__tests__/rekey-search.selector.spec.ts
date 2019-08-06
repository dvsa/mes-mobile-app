
import { RekeySearchModel, initialState } from '../rekey-search.reducer';
import { getIsLoading, getHasSearched } from '../rekey-search.selector';

describe('Rekey Search Selector', () => {
  describe('getIsLoading', () => {
    it('should return the correct isLoading value', () => {
      const state: RekeySearchModel = {
        ...initialState,
        isLoading: true,
      };
      const isLoading = getIsLoading(state);
      expect(isLoading).toBe(state.isLoading);
    });
  });

  describe('getHasSearched', () => {
    it('should return the correct hasSearched value', () => {
      const state: RekeySearchModel = {
        ...initialState,
        hasSearched: true,
      };
      const hasSearched = getHasSearched(state);
      expect(hasSearched).toBe(state.hasSearched);
    });
  });

});
