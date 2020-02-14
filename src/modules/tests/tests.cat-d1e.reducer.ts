
import { Action, combineReducers } from '@ngrx/store';
import { CatD1EUniqueTypes } from '@dvsa/mes-test-schema/categories/D1E';
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
import { journalDataCatDReducer } from './journal-data/cat-d/journal-data.cat-d.reducer';
import { vehicleDetailsCatDReducer } from './vehicle-details/cat-d/vehicle-details.cat-d.reducer';
import { testDataCatD1EReducer } from './test-data/cat-d/test-data.cat-d1e.reducer';
import { passCompletionCatDReducer } from './pass-completion/cat-d/pass-completion.cat-d.reducer';

export function testsCatD1EReducer(
  action: Action, state: CatD1EUniqueTypes.TestResult): Required<CatD1EUniqueTypes.TestResult> {
  return combineReducers(
    {
      version: schemaVersionReducer,
      category: categoryReducer,
      activityCode: activityCodeReducer,
      journalData: journalDataCatDReducer,
      preTestDeclarations: preTestDeclarationsReducer,
      accompaniment: accompanimentReducer,
      vehicleDetails: vehicleDetailsCatDReducer,
      passCompletion: passCompletionCatDReducer,
      testData: testDataCatD1EReducer,
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
      state as Required<CatD1EUniqueTypes.TestResult>,
      action,
    );
}
