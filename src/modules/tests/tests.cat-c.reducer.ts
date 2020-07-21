
import { Action, combineReducers } from '@ngrx/store';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { schemaVersionReducer } from './schema-version/schema-version.reducer';
import { categoryReducer } from './category/category.reducer';
import { preTestDeclarationsReducer } from './pre-test-declarations/common/pre-test-declarations.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { postTestDeclarationsReducer } from './post-test-declarations/post-test-declarations.reducer';
import { testSummaryReducer } from './test-summary/common/test-summary.reducer';
import { communicationPreferencesReducer } from './communication-preferences/communication-preferences.reducer';
import { rekeyReducer } from './rekey/rekey.reducer';
import { rekeyDateReducer } from './rekey-date/rekey-date.reducer';
import { rekeyReasonReducer } from './rekey-reason/rekey-reason.reducer';
import { examinerBookedReducer } from './examiner-booked/examiner-booked.reducer';
import { examinerConductedReducer } from './examiner-conducted/examiner-conducted.reducer';
import { examinerKeyedReducer } from './examiner-keyed/examiner-keyed.reducer';
import { changeMarkerReducer } from './change-marker/change-marker';
import { activityCodeReducer } from './activity-code/activity-code.reducer';
import { journalDataCatCReducer } from './journal-data/cat-c/journal-data.cat-c.reducer';
import { testDataCatCReducer } from './test-data/cat-c/test-data.cat-c.reducer';
import { vehicleDetailsCatCReducer } from './vehicle-details/cat-c/vehicle-details.cat-c.reducer';
import { passCompletionCatCReducer } from './pass-completion/cat-c/pass-completion.cat-c.reducer';
import { delegatedTestReducer } from './delegated-test/delegated-test.reducer';

export function testsCatCReducer(
  action: Action, state: CatCUniqueTypes.TestResult): Required<CatCUniqueTypes.TestResult> {
  return combineReducers(
    {
      version: schemaVersionReducer,
      category: categoryReducer,
      activityCode: activityCodeReducer,
      journalData: journalDataCatCReducer,
      preTestDeclarations: preTestDeclarationsReducer,
      accompaniment: accompanimentReducer,
      vehicleDetails: vehicleDetailsCatCReducer,
      testData: testDataCatCReducer,
      passCompletion: passCompletionCatCReducer,
      postTestDeclarations: postTestDeclarationsReducer,
      testSummary: testSummaryReducer,
      communicationPreferences: communicationPreferencesReducer,
      rekey: rekeyReducer,
      rekeyDate: rekeyDateReducer,
      rekeyReason: rekeyReasonReducer,
      delegatedTest: delegatedTestReducer,
      examinerBooked: examinerBookedReducer,
      examinerConducted: examinerConductedReducer,
      examinerKeyed: examinerKeyedReducer,
      changeMarker: changeMarkerReducer,
    })(
      state as Required<CatCUniqueTypes.TestResult>,
      action,
    );
}
