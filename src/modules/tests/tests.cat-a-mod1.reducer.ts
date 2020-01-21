import { Action, combineReducers } from '@ngrx/store';
import { TestResultCatAM1Schema } from '@dvsa/mes-test-schema/categories/AM1';
import { schemaVersionReducer } from './schema-version/schema-version.reducer';
import { categoryReducer } from './category/category.reducer';
import { preTestDeclarationsReducer } from './pre-test-declarations/common/pre-test-declarations.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { passCompletionReducer } from './pass-completion/pass-completion.reducer';
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
import { journalDataCatAMod1Reducer } from './journal-data/cat-a-mod1/journal-data.cat-a-mod1.reducer';
import { testDataCatAMod1Reducer } from './test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { vehicleDetailsCatAMod1Reducer } from './vehicle-details/cat-a-mod1/vehicle-details.cat-a-mod1.reducer';

export function testsCatAMod1Reducer(
  action: Action, state: TestResultCatAM1Schema): Required<TestResultCatAM1Schema> {
  return combineReducers(
    {
      version: schemaVersionReducer,
      category: categoryReducer,
      activityCode: activityCodeReducer,
      journalData: journalDataCatAMod1Reducer,
      preTestDeclarations: preTestDeclarationsReducer,
      accompaniment: accompanimentReducer,
      vehicleDetails: vehicleDetailsCatAMod1Reducer,
      testData: testDataCatAMod1Reducer,
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
      state as Required<TestResultCatAM1Schema>,
      action,
    );
}
