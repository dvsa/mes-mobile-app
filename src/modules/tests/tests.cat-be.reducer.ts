import { Action, combineReducers } from '@ngrx/store';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { schemaVersionReducer } from './schema-version/schema-version.reducer';
import { categoryReducer } from './category/category.reducer';
import { preTestDeclarationsReducer } from './pre-test-declarations/common/pre-test-declarations.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { passCompletionReducer } from './pass-completion/pass-completion.reducer';
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
import { journalDataCatBEReducer } from './journal-data/cat-be/journal-data.cat-be.reducer';
import { testDataCatBEReducer } from './test-data/cat-be/test-data.cat-be.reducer';
import { vehicleDetailsCatBEReducer } from './vehicle-details/cat-be/vehicle-details.cat-be.reducer';
import { delegatedTestReducer } from './delegated-test/delegated-test.reducer';
import { nullReducer } from '../../shared/classes/null.reducer';

export function testsCatBEReducer(
  action: Action, state: CatBEUniqueTypes.TestResult): Required<CatBEUniqueTypes.TestResult> {
  return combineReducers(
    {
      appVersion: nullReducer,
      version: schemaVersionReducer,
      category: categoryReducer,
      activityCode: activityCodeReducer,
      journalData: journalDataCatBEReducer,
      preTestDeclarations: preTestDeclarationsReducer,
      accompaniment: accompanimentReducer,
      vehicleDetails: vehicleDetailsCatBEReducer,
      testData: testDataCatBEReducer,
      passCompletion: passCompletionReducer,
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
    state as Required<CatBEUniqueTypes.TestResult>,
    action,
  );
}
