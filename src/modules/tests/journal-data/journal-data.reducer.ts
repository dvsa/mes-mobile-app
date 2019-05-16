import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { JournalData } from '@dvsa/mes-test-schema/categories/B';

import { examinerReducer } from '../examiner/examiner.reducer';
import { testCentreReducer } from '../test-centre/test-centre.reducer';
import { testSlotsAttributesReducer } from '../test-slot-attributes/test-slot-attributes.reducer';
import { candidateReducer } from '../candidate/candidate.reducer';
import { applicationReferenceReducer } from '../application-reference/application-reference.reducer';

export const initialState: JournalData = null;

export const journalDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return {
        test: 12345,
        ...combineReducers({
          examiner: examinerReducer,
          testCentre: testCentreReducer,
          testSlotAttributes: testSlotsAttributesReducer,
          candidate: candidateReducer,
          applicationReference: applicationReferenceReducer,
        })(state, action),
      };
  }
};

export const getJournalData = createFeatureSelector<JournalData>('journalData');
