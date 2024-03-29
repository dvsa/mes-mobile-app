import { Action, combineReducers } from '@ngrx/store';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
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
import { journalDataCatADIPart2Reducer } from './journal-data/cat-adi-part2/journal-data.cat-adi-part2.reducer';
import { testDataCatADI2Reducer } from './test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import {
    vehicleDetailsCatADIPart2Reducer,
} from './vehicle-details/cat-adi-part2/vehicle-details.cat-adi-part2.reducer';
import { nullReducer } from '../../shared/classes/null.reducer';
import {
    trainerDetailsCatADIPart2Reducer,
} from './trainer-details/cat-adi-part2/trainer-details.cat-adi-part2.reducer';
import { delegatedTestReducer } from './delegated-test/delegated-test.reducer';

export function testsCatADIPart2Reducer(
  action: Action, state: CatADI2UniqueTypes.TestResult): Required<CatADI2UniqueTypes.TestResult> {
  return combineReducers(
    {
      appVersion: nullReducer,
      version: schemaVersionReducer,
      category: categoryReducer,
      activityCode: activityCodeReducer,
      journalData: journalDataCatADIPart2Reducer,
      preTestDeclarations: preTestDeclarationsReducer,
      accompaniment: accompanimentReducer,
      vehicleDetails: vehicleDetailsCatADIPart2Reducer,
      testData: testDataCatADI2Reducer,
      trainerDetails: trainerDetailsCatADIPart2Reducer,
      passCompletion: nullReducer,
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
    state as Required<CatADI2UniqueTypes.TestResult>,
    action,
  );
}
