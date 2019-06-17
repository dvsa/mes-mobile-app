import { passCompletionReducer, initialState } from '../pass-completion.reducer';
import {
  PassCertificateNumberChanged,
  ProvisionalLicenseReceived,
  ProvisionalLicenseNotReceived,
  PopulatePassCompletion,
} from '../pass-completion.actions';

describe('pass completion reducer', () => {
  it('should populate the unanswered defaults when receiving POPULATE_PASS_COMPLETION', () => {
    const result = passCompletionReducer(initialState, new PopulatePassCompletion());
    expect(result).toEqual({ passCertificateNumber: null, provisionalLicenceProvided: null });
  });
  it('should put the pass certificate number into the state on pass certificate number changed action', () => {
    const result = passCompletionReducer(initialState, new PassCertificateNumberChanged('ABC123'));
    expect(result.passCertificateNumber).toBe('ABC123');
  });

  it('should put that the provisional license was received into state when yes selected', () => {
    let result;
    result = passCompletionReducer(result, new ProvisionalLicenseReceived());
    expect(result.provisionalLicenceProvided).toBe(true);
  });

  it('should put that the provisional license was not received into state when no selected', () => {
    let result;
    result = passCompletionReducer(result, new ProvisionalLicenseNotReceived());
    expect(result.provisionalLicenceProvided).toBe(false);
  });

  it('should toggle whether the provisional license was received', () => {
    let result;
    result = passCompletionReducer(initialState, new ProvisionalLicenseReceived());
    expect(result.provisionalLicenceProvided).toBe(true);
    result = passCompletionReducer(result, new ProvisionalLicenseNotReceived());
    expect(result.provisionalLicenceProvided).toBe(false);
  });

});
