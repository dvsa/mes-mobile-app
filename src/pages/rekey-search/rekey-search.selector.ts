import { RekeySearchModel } from './rekey-search.reducer';
import { isEmpty } from 'lodash';

export const getIsLoading = (rekeySearch: RekeySearchModel) => rekeySearch.isLoading;

export const getHasSearched = (rekeySearch: RekeySearchModel) => rekeySearch.hasSearched;

export const getBookedTestSlot = (rekeySearch: RekeySearchModel) => {

  // The reason why we are null checking in a selector is that
  // the rekey-search module might not yet been imported
  // so the rekey-search reducer is not yet registered
  // therefore no initial sate for this slice of the store
  if (isEmpty(rekeySearch)) {
    return null;
  }

  return rekeySearch.bookedTestSlot;
};
