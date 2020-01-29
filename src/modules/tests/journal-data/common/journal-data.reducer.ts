import { JournalData } from '@dvsa/mes-test-schema/categories/common';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { examinerReducer } from './examiner';
import { testCentreReducer } from './test-centre';
import { testSlotsAttributesReducer } from './test-slot-attributes';
import { candidateReducer } from './candidate';
import { applicationReferenceReducer } from './application-reference';

export const initialState: JournalData = {
  applicationReference: {
    applicationId: null,
    bookingSequence: null,
    checkDigit: null,

  },
  candidate: {},
  examiner: {
    staffNumber: null,
  },
  testCentre: {
    centreId: null,
    centreName: null,
    costCode: null,
  },
  testSlotAttributes: {
    entitlementCheck: null,
    examinerVisiting: null,
    extendedTest: null,
    previousCancellation: null,
    slotId: null,
    slotType: null,
    specialNeeds: null,
    specialNeedsArray: null,
    specialNeedsCode: null,
    start: null,
    vehicleTypeCode: null,
    welshTest: null,
  },
};

export function journalDataReducer(
  state = initialState,
  action: Action,
): Required<JournalData> {
  return combineReducers({
    examiner: examinerReducer,
    testCentre: testCentreReducer,
    testSlotAttributes: testSlotsAttributesReducer,
    candidate: candidateReducer,
    applicationReference: applicationReferenceReducer,
  })(state as Required<JournalData>, action);
}

export const getJournalData = createFeatureSelector<JournalData>('journalData');
