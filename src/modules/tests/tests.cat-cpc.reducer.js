import { combineReducers } from '@ngrx/store';
import { schemaVersionReducer } from './schema-version/schema-version.reducer';
import { categoryReducer } from './category/category.reducer';
import { preTestDeclarationsReducer } from './pre-test-declarations/common/pre-test-declarations.reducer';
import { postTestDeclarationsReducer } from './post-test-declarations/post-test-declarations.reducer';
import { communicationPreferencesReducer } from './communication-preferences/communication-preferences.reducer';
import { rekeyReducer } from './rekey/rekey.reducer';
import { rekeyDateReducer } from './rekey-date/rekey-date.reducer';
import { rekeyReasonReducer } from './rekey-reason/rekey-reason.reducer';
import { examinerBookedReducer } from './examiner-booked/examiner-booked.reducer';
import { examinerConductedReducer } from './examiner-conducted/examiner-conducted.reducer';
import { examinerKeyedReducer } from './examiner-keyed/examiner-keyed.reducer';
import { changeMarkerReducer } from './change-marker/change-marker';
import { activityCodeReducer } from './activity-code/activity-code.reducer';
import { journalDataCatCPCReducer } from './journal-data/cat-cpc/journal-data.cat-cpc.reducer';
import { testDataCatCPCReducer } from './test-data/cat-cpc/test-data.cat-cpc.reducer';
import { accompanimentCatCPCReducer } from './accompaniment/cat-cpc/accompaniment.cat-cpc.reducer';
import { vehicleDetailsCatCPCReducer } from './vehicle-details/cat-cpc/vehicle-details.cat-cpc.reducer';
import { passCompletionCatCPCReducer } from './pass-completion/cat-cpc/pass-completion.cat-cpc.reducer';
import { testSummaryCPCReducer } from './test-summary/cat-cpc/test-summary.cat-cpc.reducer';
import { delegatedTestReducer } from './delegated-test/delegated-test.reducer';
export function testsCatCPCReducer(action, state) {
    return combineReducers({
        version: schemaVersionReducer,
        category: categoryReducer,
        journalData: journalDataCatCPCReducer,
        activityCode: activityCodeReducer,
        communicationPreferences: communicationPreferencesReducer,
        preTestDeclarations: preTestDeclarationsReducer,
        accompaniment: accompanimentCatCPCReducer,
        postTestDeclarations: postTestDeclarationsReducer,
        testSummary: testSummaryCPCReducer,
        rekeyReason: rekeyReasonReducer,
        rekey: rekeyReducer,
        rekeyDate: rekeyDateReducer,
        delegatedTest: delegatedTestReducer,
        changeMarker: changeMarkerReducer,
        examinerBooked: examinerBookedReducer,
        examinerConducted: examinerConductedReducer,
        examinerKeyed: examinerKeyedReducer,
        passCompletion: passCompletionCatCPCReducer,
        vehicleDetails: vehicleDetailsCatCPCReducer,
        testData: testDataCatCPCReducer,
    })(state, action);
}
//# sourceMappingURL=tests.cat-cpc.reducer.js.map