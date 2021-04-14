import { isEmpty } from 'lodash';
export var getIsLoading = function (rekeySearch) { return rekeySearch.isLoading; };
export var getHasSearched = function (rekeySearch) { return rekeySearch.hasSearched; };
export var getDelegatedRekeySearchError = function (rekeySearch) { return rekeySearch.err; };
export var getBookedTestSlot = function (rekeySearch) {
    // The reason why we are null checking in a selector is that
    // the rekey-search module might not yet been imported
    // so the rekey-search reducer is not yet registered
    // therefore no initial sate for this slice of the store
    if (isEmpty(rekeySearch)) {
        return null;
    }
    return rekeySearch.bookedTestSlot;
};
//# sourceMappingURL=delegated-rekey-search.selector.js.map