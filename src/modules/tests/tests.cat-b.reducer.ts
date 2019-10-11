import { Action, combineReducers } from '@ngrx/store';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import { nestedCombineReducers } from 'nested-combine-reducers';
import { schemaVersionReducer } from './schema-version/schema-version.reducer';
import { categoryReducer } from './category/category.reducer';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/BE';
import { examinerReducer } from './examiner/examiner.reducer';
import { testCentreReducer } from './test-centre/test-centre.reducer';
import { testSlotsAttributesReducer } from './test-slot-attributes/test-slot-attributes.reducer';
import { candidateReducer } from './candidate/candidate.reducer';
import { applicationReferenceReducer } from './application-reference/application-reference.reducer';
import { preTestDeclarationsReducer } from './pre-test-declarations/pre-test-declarations.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { vehicleDetailsReducer } from './vehicle-details/vehicle-details.reducer';
import { instructorDetailsReducerFactory } from './instructor-details/instructor-details-reducer-factory';
import { testDataReducerFactory } from './test-data/test-data-reducer-factory';
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

export function testsCatBReducer(
  category: string | null,
  action: Action,
  state: StandardCarTestCATBSchema,
  ): Required<StandardCarTestCATBSchema> {
  console.log('Cat B');
  return {
    ...nestedCombineReducers(
      {
        version: schemaVersionReducer,
        category: categoryReducer,
        activityCode: () => '1' as ActivityCode, // TODO - Need to fix
        journalData: {
          examiner: examinerReducer,
          testCentre: testCentreReducer,
          testSlotAttributes: testSlotsAttributesReducer,
          candidate: candidateReducer,
          applicationReference: applicationReferenceReducer,
        },
        preTestDeclarations: preTestDeclarationsReducer,
        accompaniment: accompanimentReducer,
        vehicleDetails: vehicleDetailsReducer,
        // TODO - we don't need this factory can hard code it
        instructorDetails: instructorDetailsReducerFactory(category),
        // TODO - don't need this factory can hard code it - we could break this down like the journal reducer
        testData: testDataReducerFactory(category),
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
      }, combineReducers)(
      state as Required<StandardCarTestCATBSchema>,
      action,
    ),
  };
}
