import {
  PassCertificateNumberChanged,
  ProvisionalLicenseReceived,
  ProvisionalLicenseNotReceived,
  PopulatePassCompletion,
  Code78NotPresent,
  Code78Present,
} from '../pass-completion.actions';
import { passCompletionCatBEReducer, initialState } from '../pass-completion.cat-be.reducer';

describe('pass completion reducer', () => {
  it('should populate the unanswered defaults when receiving POPULATE_PASS_COMPLETION', () => {
    const result = passCompletionCatBEReducer(initialState, new PopulatePassCompletion());
    expect(result).toEqual({ passCertificateNumber: null, provisionalLicenceProvided: null, code78Present: null });
  });
  it('should put the pass certificate number into the state on pass certificate number changed action', () => {
    const result = passCompletionCatBEReducer(initialState, new PassCertificateNumberChanged('ABC123'));
    expect(result.passCertificateNumber).toBe('ABC123');
  });

  it('should put that the provisional license was received into state when yes selected', () => {
    let result;
    result = passCompletionCatBEReducer(result, new ProvisionalLicenseReceived());
    expect(result.provisionalLicenceProvided).toBe(true);
  });

  it('should put that the provisional license was not received into state when no selected', () => {
    let result;
    result = passCompletionCatBEReducer(result, new ProvisionalLicenseNotReceived());
    expect(result.provisionalLicenceProvided).toBe(false);
  });

  it('should toggle whether the provisional license was received', () => {
    let result;
    result = passCompletionCatBEReducer(initialState, new ProvisionalLicenseReceived());
    expect(result.provisionalLicenceProvided).toBe(true);
    result = passCompletionCatBEReducer(result, new ProvisionalLicenseNotReceived());
    expect(result.provisionalLicenceProvided).toBe(false);
  });

  it('should put that code 78 was present into state when yes selected', () => {
    let result;
    result = passCompletionCatBEReducer(result, new Code78Present());
    expect(result.code78Present).toBe(true);
  });

  it('should put that code 78 was not present into state when no selected', () => {
    let result;
    result = passCompletionCatBEReducer(result, new Code78NotPresent());
    expect(result.code78Present).toBe(false);
  });

  it('should toggle whether code 78 was present', () => {
    let result;
    result = passCompletionCatBEReducer(initialState, new Code78Present());
    expect(result.code78Present).toBe(true);
    result = passCompletionCatBEReducer(result, new Code78NotPresent());
    expect(result.code78Present).toBe(false);
  });

});
