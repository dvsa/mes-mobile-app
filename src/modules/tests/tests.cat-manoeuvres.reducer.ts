import { Action, combineReducers } from '@ngrx/store';
import { TestResultCatDMSchema } from '@dvsa/mes-test-schema/categories/DM';
import { TestResultCatC1MSchema } from '@dvsa/mes-test-schema/categories/C1M';
import { TestResultCatCEMSchema } from '@dvsa/mes-test-schema/categories/CEM';
import { TestResultCatC1EMSchema } from '@dvsa/mes-test-schema/categories/C1EM';
import { TestResultCatD1EMSchema } from '@dvsa/mes-test-schema/categories/D1EM';
import { TestResultCatDEMSchema } from '@dvsa/mes-test-schema/categories/DEM';
import { TestResultCatD1MSchema } from '@dvsa/mes-test-schema/categories/D1M';
import { TestResultCatCMSchema } from '@dvsa/mes-test-schema/categories/CM';
import { schemaVersionReducer } from './schema-version/schema-version.reducer';
import { categoryReducer } from './category/category.reducer';
import { rekeyReducer } from './rekey/rekey.reducer';
import { rekeyDateReducer } from './rekey-date/rekey-date.reducer';
import { rekeyReasonReducer } from './rekey-reason/rekey-reason.reducer';
import { examinerBookedReducer } from './examiner-booked/examiner-booked.reducer';
import { examinerConductedReducer } from './examiner-conducted/examiner-conducted.reducer';
import { examinerKeyedReducer } from './examiner-keyed/examiner-keyed.reducer';
import { changeMarkerReducer } from './change-marker/change-marker';
import { activityCodeReducer } from './activity-code/activity-code.reducer';
import { nullReducer } from '../../shared/classes/null.reducer';
import { journalDataReducer } from './journal-data/cat-b/journal-data.reducer';
import {
    passCompletionCatManoeuvresReducer,
} from './pass-completion/cat-manoeuvres/pass-completion.cat-manoeuvres.reducer';
import {
    communicationPreferencesCatManoeuvresReducer,
} from './communication-preferences/cat-manoeuvres/communication-preferences-cat-manoeuvres.reducer';
import {
    vehicleDetailsCatManoeuvresReducer,
} from './vehicle-details/cat-manoeuvres/vehicle-details.cat-manoeuvres.reducer';
import { testSummaryCatManoeuvresReducer } from './test-summary/cat-manoeuvres/test-summary.cat-manoeuvres.reducer';

export type TestResultManoeuvres =
  TestResultCatCMSchema |
  TestResultCatC1MSchema |
  TestResultCatCEMSchema |
  TestResultCatC1EMSchema |
  TestResultCatD1EMSchema |
  TestResultCatDEMSchema |
  TestResultCatD1MSchema |
  TestResultCatDMSchema;

export function testsCatManoeuvresReducer(
  action: Action,
  state: TestResultManoeuvres,
): Required<TestResultManoeuvres> {
  return combineReducers(
    {
      appVersion: nullReducer,
      version: schemaVersionReducer,
      category: categoryReducer,
      activityCode: activityCodeReducer,
      journalData: journalDataReducer,
      vehicleDetails: vehicleDetailsCatManoeuvresReducer,
      passCompletion: passCompletionCatManoeuvresReducer,
      testSummary: testSummaryCatManoeuvresReducer,
      communicationPreferences: communicationPreferencesCatManoeuvresReducer,
      rekey: rekeyReducer,
      rekeyDate: rekeyDateReducer,
      rekeyReason: rekeyReasonReducer,
      examinerBooked: examinerBookedReducer,
      examinerConducted: examinerConductedReducer,
      examinerKeyed: examinerKeyedReducer,
      changeMarker: changeMarkerReducer,
    })(
    state as Required<TestResultManoeuvres>,
    action,
  );
}
