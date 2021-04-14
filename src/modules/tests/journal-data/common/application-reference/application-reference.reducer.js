import { createFeatureSelector } from '@ngrx/store';
import * as applicationReferenceActions from './application-reference.actions';
export var initialState = {
    applicationId: null,
    bookingSequence: null,
    checkDigit: null,
};
export function applicationReferenceReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case applicationReferenceActions.POPULATE_APPLICATION_REFERENCE:
            return {
                applicationId: action.payload.applicationId,
                bookingSequence: action.payload.bookingSequence,
                checkDigit: action.payload.checkDigit,
            };
    }
    return state;
}
export var getApplicationReference = createFeatureSelector('applicationReference');
//# sourceMappingURL=application-reference.reducer.js.map