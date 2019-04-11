import { JournalData } from '@dvsa/mes-test-schema/categories/B';
import { createFeatureSelector } from '@ngrx/store';
import * as journalDataActions from './journal-data.actions';

export const initialState:JournalData = {
  welshTest: null,
  slotId: null,
  start: '',
  staffNumber: '',
  costCode: '',
  testCategory: '',
  vehicleSlotType: '',
  extendedTest: false,
  candidate: {},
  applicationReference: {
    applicationId: null,
    bookingSequence: null,
    checkDigit: null,
  },
};

export function journalDataReducer(
  state = initialState,
  action: journalDataActions.Types,
): JournalData {
  switch (action.type) {
    case journalDataActions.POPULATE_JOURNAL_DATA:
      console.log(`payload ${JSON.stringify(action.payload)}`);
      return action.payload;
  }
  return state;
}

export const getJournalData = createFeatureSelector<JournalData>('journalData');
