
import { Action, combineReducers } from '@ngrx/store';
import { StandardCarTestCATBSchema, TestData, JournalData } from '@dvsa/mes-test-schema/categories/B';
import { nestedCombineReducers } from 'nested-combine-reducers';
import { schemaVersionReducer } from './schema-version/schema-version.reducer';
import { categoryReducer } from './category/category.reducer';
import { examinerReducer } from './examiner/examiner.reducer';
import { testCentreReducer } from './test-centre/test-centre.reducer';
import { testSlotsAttributesReducer } from './test-slot-attributes/test-slot-attributes.reducer';
import { candidateReducer } from './candidate/candidate.reducer';
import { applicationReferenceReducer } from './application-reference/application-reference.reducer';
import { preTestDeclarationsReducer } from './pre-test-declarations/pre-test-declarations.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { vehicleDetailsReducer } from './vehicle-details/vehicle-details.reducer';
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
import { instructorDetailsReducer } from './instructor-details/instructor-details.reducer';
import { drivingFaultsReducer } from './test-data/driving-faults/driving-faults.reducer';
import { dangerousFaultsReducer } from './test-data/dangerous-faults/dangerous-faults.reducer';
import { seriousFaultsReducer } from './test-data/serious-faults/serious-faults.reducer';
import { vehicleChecksReducer } from './test-data/vehicle-checks/vehicle-checks.reducer';
import { controlledStopReducer } from './test-data/controlled-stop/controlled-stop.reducer';
import { ecoReducer } from './test-data/eco/eco.reducer';
import { etaReducer } from './test-data/eta/eta.reducer';
import { eyesightTestReducer } from './test-data/eyesight-test/eyesight-test.reducer';
import { manoeuvresReducer } from './test-data/manoeuvres/manoeuvres.reducer';
import { testRequirementsReducer } from './test-data/test-requirements/test-requirements.reducer';

export function testsCatBReducer(
  action: Action, state: StandardCarTestCATBSchema): Required<StandardCarTestCATBSchema> {
  return {
    ...nestedCombineReducers(
      {
        version: schemaVersionReducer,
        category: categoryReducer,
        activityCode: activityCodeReducer,
        journalData: {
          examiner: examinerReducer,
          testCentre: testCentreReducer,
          testSlotAttributes: testSlotsAttributesReducer,
          candidate: candidateReducer,
          applicationReference: applicationReferenceReducer,
        } as Required<JournalData>,
        preTestDeclarations: preTestDeclarationsReducer,
        accompaniment: accompanimentReducer,
        vehicleDetails: vehicleDetailsReducer,
        instructorDetails: instructorDetailsReducer,
        testData: {
          drivingFaults: drivingFaultsReducer,
          dangerousFaults: dangerousFaultsReducer,
          seriousFaults: seriousFaultsReducer,
          vehicleChecks: vehicleChecksReducer,
          controlledStop: controlledStopReducer,
          eco: ecoReducer,
          ETA: etaReducer,
          eyesightTest: eyesightTestReducer,
          manoeuvres: manoeuvresReducer,
          testRequirements: testRequirementsReducer,
          // TODO - we don't use this
          faultSummary: () => {
            return { totalDangerousFaults: null , totalDrivingFaults: null , totalSeriousFaults: null };
          },
        } as Required<TestData>,
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
