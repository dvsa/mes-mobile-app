import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { examinerReducer } from '../common/examiner/examiner.reducer';
import { testCentreReducer } from '../common/test-centre/test-centre.reducer';
import { testSlotsAttributesReducer } from '../common/test-slot-attributes/test-slot-attributes.reducer';
import { candidateCatCReducer } from './candidate/candidate.cat-c.reducer';
import { applicationReferenceReducer } from '../common/application-reference/application-reference.reducer';
export var initialState = {
    applicationReference: {
        applicationId: null,
        bookingSequence: null,
        checkDigit: null,
    },
    candidate: {},
    examiner: {
        // TODO - we don't use this anywhere in the code.
        individualId: null,
        staffNumber: null,
    },
    testCentre: {
        centreId: null,
        centreName: null,
        costCode: null,
    },
    testSlotAttributes: {
        entitlementCheck: null,
        examinerVisiting: null,
        extendedTest: null,
        previousCancellation: null,
        slotId: null,
        slotType: null,
        specialNeeds: null,
        specialNeedsArray: null,
        specialNeedsCode: null,
        start: null,
        vehicleTypeCode: null,
        welshTest: null,
    },
};
export function journalDataCatCReducer(state, action) {
    if (state === void 0) { state = initialState; }
    return combineReducers({
        examiner: examinerReducer,
        testCentre: testCentreReducer,
        testSlotAttributes: testSlotsAttributesReducer,
        candidate: candidateCatCReducer,
        applicationReference: applicationReferenceReducer,
    })(state, action);
}
export var getJournalData = createFeatureSelector('journalData');
//# sourceMappingURL=journal-data.cat-c.reducer.js.map