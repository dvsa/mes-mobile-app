
import { Action, combineReducers } from '@ngrx/store';
import { TestResultCatAM2Schema } from '@dvsa/mes-test-schema/categories/AM2';
import { schemaVersionReducer } from './schema-version/schema-version.reducer';
import { categoryReducer } from './category/category.reducer';
import { preTestDeclarationsCatAMod2Reducer }
  from './pre-test-declarations/cat-a-mod2/pre-test-declarations.cat-a-mod2.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { postTestDeclarationsReducer } from './post-test-declarations/post-test-declarations.reducer';
import { testSummaryReducer } from './test-summary/test-summary.reducer';
import { communicationPreferencesReducer } from './communication-preferences/communication-preferences.reducer';
import { rekeyReducer } from './rekey/rekey.reducer';
import { rekeyDateReducer } from './rekey-date/rekey-date.reducer';
import { rekeyReasonReducer } from './rekey-reason/rekey-reason.reducer';
import { examinerBookedReducer } from './examiner-booked/examiner-booked.reducer';
import { examinerConductedReducer } from './examiner-conducted/examiner-conducted.reducer';
import { examinerKeyedReducer } from './examiner-keyed/examiner-keyed.reducer';
import { changeMarkerReducer } from './change-marker/change-marker';
import { activityCodeReducer } from './activity-code/activity-code.reducer';
import { journalDataCatAMod2Reducer } from './journal-data/cat-a-mod2/journal-data.cat-a-mod2.reducer';
import { testDataCatAMod2Reducer } from './test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import { vehicleDetailsCatAMod2Reducer } from './vehicle-details/cat-a-mod2/vehicle-details.cat-a-mod2.reducer';
import { passCompletionReducer } from './pass-completion/pass-completion.reducer';

export function testsCatAMod2Reducer(
  action: Action, state: TestResultCatAM2Schema): Required<TestResultCatAM2Schema> {
  return combineReducers(
    {
      version: schemaVersionReducer,
      category: categoryReducer,
      activityCode: activityCodeReducer,
      journalData: journalDataCatAMod2Reducer,
      preTestDeclarations: preTestDeclarationsCatAMod2Reducer,
      accompaniment: accompanimentReducer,
      vehicleDetails: vehicleDetailsCatAMod2Reducer,
      testData: testDataCatAMod2Reducer,
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
      state as Required<TestResultCatAM2Schema>,
      action,
    );
}
