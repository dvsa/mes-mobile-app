
import { Action, combineReducers } from '@ngrx/store';
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
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
import { journalDataCatHomeReducer } from './journal-data/cat-home/journal-data.cat-home.reducer';
import { testDataCatFReducer } from './test-data/cat-home/test-data.cat-f.reducer';
import { vehicleDetailsCatHomeReducer } from './vehicle-details/cat-home/vehicle-details.cat-home.reducer';
import { passCompletionReducer } from './pass-completion/pass-completion.reducer';

export function testsCatFReducer(
  action: Action, state: CatFUniqueTypes.TestResult): Required<CatFUniqueTypes.TestResult> {
  return combineReducers(
    {
      version: schemaVersionReducer,
      category: categoryReducer,
      activityCode: activityCodeReducer,
      journalData: journalDataCatHomeReducer,
      preTestDeclarations: preTestDeclarationsReducer,
      accompaniment: accompanimentReducer,
      vehicleDetails: vehicleDetailsCatHomeReducer,
      testData: testDataCatFReducer,
      passCompletion: passCompletionReducer,
      postTestDeclarations: postTestDeclarationsReducer,
      testSummary: testSummaryReducer,
      communicationPreferences: communicationPreferencesReducer,
      rekey: rekeyReducer,
      rekeyDate: rekeyDateReducer,
      rekeyReason: rekeyReasonReducer,
      examinerBooked: examinerBookedReducer,
      examinerConducted: examinerConductedReducer,
      examinerKeyed: examinerKeyedReducer,
      changeMarker: changeMarkerReducer,
    })(
      state as Required<CatFUniqueTypes.TestResult>,
      action,
    );
}
