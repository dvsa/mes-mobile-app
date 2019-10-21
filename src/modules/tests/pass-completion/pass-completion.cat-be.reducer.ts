
import { PassCompletion } from '@dvsa/mes-test-schema/categories/BE';
import { Action } from '@ngrx/store';

export const initialState: PassCompletion = {
  provisionalLicenceProvided: false,
  passCertificateNumber: '',
  code78Present: false,
};

export function passCompletionCatBeReducer(state: PassCompletion = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
