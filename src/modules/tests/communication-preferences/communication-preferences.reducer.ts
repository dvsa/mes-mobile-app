import { CommunicationPreferences } from '@dvsa/mes-test-schema/categories/B';
import * as communicationPrefActions from './communication-preferences.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CommunicationPreferences = {
  updatedEmail: '',
  communicationMethod: null,
};

export const communicationPreferencesReducer = (
  state = initialState,
  action: communicationPrefActions.Types,
): CommunicationPreferences => {
  switch (action.type) {
    case communicationPrefActions.CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL:
      return {
        ...state,
        updatedEmail: action.updatedEmail,
        communicationMethod: action.communicationMethod,
      };
    case communicationPrefActions.CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST:
      return {
        ...state,
        communicationMethod: action.communicationMethod,
      };
    case communicationPrefActions.CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_SUPPORT_CENTRE:
      return {
        ...state,
        communicationMethod: action.communicationMethod,
      };
    default:
      return state;
  }
};

export const getCommunicationPreference = createFeatureSelector<CommunicationPreferences>('communicationPreferences');
