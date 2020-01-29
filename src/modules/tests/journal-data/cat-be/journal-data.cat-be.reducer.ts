import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import {
  applicationReferenceReducer,
  testSlotsAttributesReducer,
  testCentreReducer,
  examinerReducer,
} from '../common';
import { candidateCatBEReducer } from './candidate/candidate.cat-be.reducer';

export const initialState: CatBEUniqueTypes.JournalData = {
  applicationReference: {
    applicationId: null,
    bookingSequence: null,
    checkDigit: null,

  },
  candidate: {},
  examiner: {
    // TODO - we don't use this anywhere in the code.
    individualId: null,
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

export function journalDataCatBEReducer(
  state = initialState,
  action: Action,
): Required<CatBEUniqueTypes.JournalData> {
  return combineReducers({
    examiner: examinerReducer,
    testCentre: testCentreReducer,
    testSlotAttributes: testSlotsAttributesReducer,
    candidate: candidateCatBEReducer,
    applicationReference: applicationReferenceReducer,
  })(state as Required<CatBEUniqueTypes.JournalData>, action);
}

export const getJournalData = createFeatureSelector<CatBEUniqueTypes.JournalData>('journalData');
