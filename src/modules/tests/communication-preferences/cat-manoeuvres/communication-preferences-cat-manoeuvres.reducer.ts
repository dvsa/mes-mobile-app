import { createFeatureSelector } from '@ngrx/store';
import { CommunicationPreferences } from '@dvsa/mes-test-schema/categories/CM';
import * as communicationPrefActions from '../communication-preferences.actions';

export const initialState: CommunicationPreferences = {
  conductedLanguage: 'Not provided',
};

export const communicationPreferencesCatManoeuvresReducer = (
  state = initialState,
  action: communicationPrefActions.Types,
): CommunicationPreferences => {
  switch (action.type) {
    case communicationPrefActions.CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_ENGLISH:
      return {
        ...state,
        conductedLanguage: action.conductedLanguage,
      };
    default:
      return state;
  }
};

export const getCommunicationPreference = createFeatureSelector<CommunicationPreferences>('communicationPreferences');
