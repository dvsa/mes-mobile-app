
import { PassCompletion } from '@dvsa/mes-test-schema/categories/BE';

export const initialState: PassCompletion = {
  provisionalLicenceProvided: false,
  passCertificateNumber: '',
  code78Present: false,
};

export function passCompletionCatBEReducer(state: PassCompletion = initialState, action) {
  return state;
}
